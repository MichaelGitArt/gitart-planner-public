const shortId = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Member = require('./member');

shortId.characters(process.env.SHORTID_CHARS);

const groupSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			default: shortId.generate,
			unique: true,
			index: true,
		},
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Member',
			},
		],
	},
	{ timestamp: true },
);

groupSchema.methods.addMember = async function(user, role = 'member') {
	const member = new Member({
		group: this._id.toString(),
		user: user._id.toString(),
		role,
	});
	await member.save();

	// Add membership to group and user
	this.members.push(member);
	user.membership.push(member);
	await this.save();
	await user.save();
};

module.exports = mongoose.model('Group', groupSchema);
