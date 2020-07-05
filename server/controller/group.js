const { minifySpaces } = require('../libs/utils');

const { validationResult } = require('express-validator');
const resMessages = require('../libs/response-messages');

const Group = require('../model/group');
const Member = require('../model/member');
const User = require('../model/user');
const {
	NotFoundError,
	AccessDenied,
	InvalidRequestError,
	UnexpectedError,
	ValidationError,
} = require('../libs/errors');

module.exports.createGroup = async (req, res) => {
	const groupName = req.body.name;

	const group = new Group({
		name: groupName,
	});
	await group.addMember(req.user, 'primary');

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

	const isMember = await group.hasMember(req.user);
	if (isMember) {
		throw InvalidRequestError('Ти вже учасник цієї групи');
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

	const isMember = await group.hasMember(req.user);

	if (!isMember) {
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
				isYou: { $eq: [req.user.slug, '$user.slug'] },
				isAdmin: {
					$or: [{ $eq: ['admin', '$role'] }, { $eq: ['primary', '$role'] }],
				},
				isPrimary: { $eq: ['primary', '$role'] },
			},
		},
	]).exec((err, foundedMembers) => {
		console.log(foundedMembers);
		if (err) {
			throw UnexpectedError();
		}

		res.json({
			success: true,
			group: {
				name: group.name,
				code: group.code,
				members: foundedMembers,
				isAdmin: isMember.isAdmin,
				isPrimary: isMember.isPrimary,
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
				isAdmin: {
					$or: [{ $eq: ['admin', '$role'] }, { $eq: ['primary', '$role'] }],
				},
				name: '$group.name',
				code: '$group.code',
				countMembers: { $size: '$group.members' },
			},
		},
	]).exec((err, groups) => {
		if (err) {
			throw UnexpectedError();
		}

		res.json({
			success: true,
			groups,
		});
	});
};

module.exports.removeMember = async (req, res) => {
	const { groupCode, userSlug } = req.body;
	const group = await Group.findOne().byCode(groupCode);
	const user = await User.findOne().bySlug(userSlug);
	const membership = await Member.findOne({
		user: user._id,
		group: group._id,
	});

	if (!membership) {
		throw InvalidRequestError();
	}

	//	User leaves some group
	if (userSlug === user.slug) {
		// User is admin
		if (membership.isAdmin) {
			const administratorsCount = await group.getAdministratorsCount();

			// Do not leave group without administrator
			if (administratorsCount <= 1)
				throw InvalidRequestError(
					'Ти останій староста групи. Признач старостою іншого учасника або видали групу в панелі керування групою',
				);

			await membership.removeMembership(group, user);
		}
		//	User is not admin
		else {
			await membership.removeMembership(group, user);
		}
	}
	//	Admin removes member
	else {
		console.log('Try to remove else user');
	}

	return res.json({
		success: true,
	});
};
module.exports.updateGroup = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw ValidationError(resMessages.errors.validationError, errors.array());
	}

	const { groupCode, updateFields } = req.body;
	const group = await Group.findOne().byCode(groupCode);

	const isMember = await group.hasMember(req.user._id);

	if (!isMember.isAdmin) throw AccessDenied();

	group.name = minifySpaces(updateFields.name);
	await group.save();

	return res.json({
		success: true,
		group: {
			name: group.name,
		},
	});
};
