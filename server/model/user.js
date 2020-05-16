const shortId = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

shortId.characters(process.env.SHORTID_CHARS);

const userSchema = new Schema(
	{
		name: String,
		lastName: String,
		password: String,
		email: {
			type: String,
			lowercase: true,
			required: true,
			match: [/\S+@\S+\.\S+/, 'is invalid'],
			index: true,
		},
		emailConfirmed: {
			type: Boolean,
			default: false,
		},
		slug: {
			type: String,
			default: shortId.generate,
			unique: true,
			index: true,
		},
		membership: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Member',
			},
		],
	},
	{ timestamp: true },
);

userSchema.methods.getProfileInfo = function() {
	return {
		name: this.name,
		slug: this.slug,
	};
};

module.exports = mongoose.model('User', userSchema);
