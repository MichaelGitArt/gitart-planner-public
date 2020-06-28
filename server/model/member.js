const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		role: {
			type: String,
			required: true,
			enum: ['admin', 'member', 'primary'],
		},
		group: {
			type: Schema.Types.ObjectId,
			ref: 'Group',
		},
	},
	{ timestamp: true },
);

memberSchema.methods.removeMembership = async function(group, user) {
	if (!group) {
		group = await this.model('Group').findById(this.group);
	}
	if (!user) {
		user = await this.model('User').findById(this.user);
	}

	let deleteInfo = await this.deleteOne();
	if (!deleteInfo) new Error();

	group.members = group.members.filter((membership) => {
		return membership._id.toString() !== this._id.toString();
	});
	await group.save();

	user.membership = user.membership.filter((membership) => {
		return membership._id.toString() !== this._id.toString();
	});
	await user.save();

	return {
		success: true,
	};
};

memberSchema.virtual('isAdmin').get(function() {
	return this.role === 'admin' || this.role === 'primary';
});

module.exports = mongoose.model('Member', memberSchema);
