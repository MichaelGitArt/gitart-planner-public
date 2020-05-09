const Group = require('../model/group');
const Member = require('../model/member');

const errorMessages = require('../libs/response-messages');

module.exports.getGroups = (req, res) => {
	console.log('Geting...')

	let query = {
		user: req.user._id.toString()
	}
	Member.find(query)
		.populate('group')
		.populate({
			path: 'group',
			populate: {
				path: 'members'
			}
		})
		.then(responce => {
			console.log(`module.exports.getGroups -> responce`, responce);
		})
	// res.json({
	// 	success: true
	// })
};

module.exports.createGroup = (req, res) => {
	const name = req.body.name;

	const group = new Group({
		name
	})

	let savedGroup;

	group.validate()
		.then(() => {
			return group.save();
		})
		.then(result => {
			savedGroup = result;
			const member = new Member({
				user: req.user._id.toString(),
				group: savedGroup._id.toString(),
				role: 'admin'
			});
			return member.save();
		})
		.then((member) => {
			savedGroup.members.push(member)
			return Promise.all([savedGroup.save(), req.user.addMembership(member)])
		})
		.then(([group, user]) => {

			return res.json({
				success: true,
				message: 'Група створена!',
				group: {
					name: group.name,
					code: group.code,
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