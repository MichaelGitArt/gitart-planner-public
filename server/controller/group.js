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

module.exports.getGroup = async (req, res) => {
	const groupCode = req.params.code;
	console.log('groupCode', groupCode);
	const group = await Group.findOne({ code: groupCode });
	console.log('group: ', group);
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
			console.log(err);
			return res.json({
				success: false,
				originalError: err,
				message: errorMessages.errors.notFoundError,
			});
		}

		res.json({
			success: true,
			group: {
				name: group.name,
				users: foundedUsers,
			},
		});
	});
};

module.exports.getGroups = (req, res) => {
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
