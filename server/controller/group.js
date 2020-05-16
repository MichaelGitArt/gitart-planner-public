const Group = require('../model/group');
const Member = require('../model/member');
const errorMessages = require('../libs/response-messages');

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

module.exports.createGroup = (req, res) => {
	const name = req.body.name;

	const group = new Group({
		name,
		members: [
			{
				user: req.user,
				role: 'admin',
			},
		],
	});

	let savedGroup;

	group
		.validate()
		.then(() => {
			return group.save();
		})
		.then(() => {
			savedGroup = result;

			return req.user.addGroup(savedGroup);
		})
		.then(() => {
			return res.json({
				success: true,
				message: 'Група створена!',
				group: {
					name: savedGroup.name,
					code: savedGroup.code,
					role: 'admin',
				},
			});
		})
		.catch((err) => {
			res.json({
				success: false,
				originalError: err,
				message: errorMessages.errors.validationError,
			});
		});
};
