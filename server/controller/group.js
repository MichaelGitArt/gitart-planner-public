const Group = require('../model/group');
const Member = require('../model/member');
const User = require('../model/user');
const { NotFoundError, AccessDenied } = require('../libs/errors');

module.exports.createGroup = async (req, res) => {
	const groupName = req.body.name;

	const group = new Group({
		name: groupName,
	});
	await group.addMember(req.user, 'admin');

	return res.json({
		success: true,
		message: 'Група створена!',
		group: {
			name: group.name,
			code: group.code,
			isAdmin: true,
		},
	});
};

module.exports.joinGroup = async (req, res) => {
	const groupCode = req.body.code;

	const group = await Group.findOne({ code: groupCode });
	if (!group) {
		throw NotFoundError('Група не знайдена');
	}

	await group.addMember(req.user, 'member');

	return res.json({
		success: true,
		group: {
			name: group.name,
			code: group.code,
			isAdmin: false,
			countMembers: group.members.length,
		},
	});
};

module.exports.getGroup = async (req, res) => {
	const groupCode = req.params.code;
	const group = await Group.findOne({ code: groupCode });

	if (!group) {
		throw NotFoundError('Група не знайдена');
	}

	const groupMembership = await Member.findOne({
		user: req.user,
		group: group._id,
	});

	if (!groupMembership) {
		throw AccessDenied();
	}

	Member.aggregate([
		{
			$match: {
				group: group._id,
			},
		},
		{
			$lookup: {
				from: User.collection.name,
				let: { curGroup: '$group', curUser: '$user' },
				pipeline: [
					{
						$match: {
							$expr: {
								$eq: ['$_id', '$$curUser'],
							},
						},
					},
					{
						$project: {
							name: true,
							slug: true,
						},
					},
				],
				as: 'user',
			},
		},
		{ $unwind: '$user' },
		{
			$project: {
				_id: false,
				role: true,
				name: '$user.name',
				slug: '$user.slug',
			},
		},
	]).exec((err, foundedUsers) => {
		if (err) {
			throw NotFoundError();
		}

		res.json({
			success: true,
			group: {
				name: group.name,
				code: group.code,
				users: foundedUsers,
			},
		});
	});
};

module.exports.getGroups = async (req, res) => {
	Member.aggregate([
		{
			$match: {
				user: req.user._id,
			},
		},
		{
			$lookup: {
				from: 'groups',
				localField: 'group',
				foreignField: '_id',
				as: 'group',
			},
		},
		{ $unwind: '$group' },
		{
			$project: {
				_id: false,
				isAdmin: { $eq: ['admin', '$role'] },
				name: '$group.name',
				code: '$group.code',
				countMembers: { $size: '$group.members' },
			},
		},
	]).exec((err, groups) => {
		if (err) {
			throw NotFoundError('Група не знайдена');
		}

		res.json({
			success: true,
			groups,
		});
	});
};
