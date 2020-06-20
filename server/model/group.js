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

groupSchema.query.byCode = function(code) {
	return this.findOne({ code });
};

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

groupSchema.methods.hasMember = async function(user) {
	return this.model('Member').findOne({
		user: user._id,
		group: this._id,
	});
};
groupSchema.methods.getAdministratorsCount = async function() {
	return new Promise((resolve, reject) => {
		this.model('Member')
			.aggregate([
				{
					$match: {
						group: this._id,
						role: 'admin',
					},
				},
				{
					$count: 'adminCount',
				},
			])
			.exec((err, [founded]) => {
				if (founded && !err) {
					return resolve(founded.adminCount);
				}
				reject(
					new Error(
						'Не вийшло знайти іншого старости. Спробуй знову або звернися до адміністрації сайту',
					),
				);
			});
	});
};

module.exports = mongoose.model('Group', groupSchema);
