const Group = require('../model/group');
const Member = require('../model/member');
const User = require('../model/user');
const errorMessages = require('../libs/response-messages');

module.exports.createGroup = async (req, res) => {
	const groupName = req.body.name;

	const group = new Group({
		name: groupName,
	});
	await group.save();

	const member = new Member({
		group: group._id.toString(),
		user: req.user._id.toString(),
		role: 'admin',
	});
	await member.save();

	// Add membership to group and user
	group.members.push(member);
	req.user.membership.push(member);
	await group.save();
	await req.user.save();

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
		const error = new Error('Група не знайдена');
		error.statusCode = 404;
		throw error;
	}

	const member = new Member({
		group: group._id.toString(),
		user: req.user._id.toString(),
		role: 'member',
	});
	await member.save();

	// Add membership to group and user
	group.members.push(member);
	req.user.membership.push(member);
	await group.save();
	await req.user.save();

	return res.json({
		success: true,
		message: 'Ти приєднався!',
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
		const error = new Error('Група не знайдена');
		error.statusCode = 404;
		throw error;
	}

	const groupMembership = await Member.findOne({
		user: req.user,
		group: group._id,
	});

	if (!groupMembership) {
		const error = new Error('Доступ закритий');
		error.statusCode = 403;
		throw error;
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
			const error = new Error();
			error.statusCode = 404;
			throw error;
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
			return res.json({
				success: false,
				originalError: err,
				message: errorMessages.errors.notFoundError,
			});
		}

		res.json({
			success: true,
			groups,
		});
	});
};
