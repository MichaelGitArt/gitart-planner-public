const Group = require('../model/group');
const errorMessages = require('../libs/response-messages');

module.exports.createGroup = (req, res) => {
	const name = req.body.name;

	const group = new Group({
		name,
		members: [{
			user: req.user,
			role: 'admin'
		}]
	})

	let savedGroup;

	group.validate()
		.then(() => {
			return group.save();
		})
		.then(result => {
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
					role: 'admin'
				}
			})
		})
		.catch((err) => {
			console.log(`createGroup -> err`, err);
			res.json({
				success: false,
				message: errorMessages.errors.validationError
			})
		})
}