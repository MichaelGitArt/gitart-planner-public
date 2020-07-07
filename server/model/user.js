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
		avatar: {
			type: String,
		},
	},
	{ timestamp: true },
);

userSchema.query.bySlug = function(slug) {
	return this.findOne({ slug });
};

userSchema.virtual('avatarPath').get(function() {
	return this.avatar
		? '/uploads/user/' + this.avatar
		: '/uploads/placeholder/avatar.png';
});

userSchema.methods.getProfileInfo = function() {
	return {
		name: this.name,
		slug: this.slug,
		avatar: this.avatarPath,
	};
};

module.exports = mongoose.model('User', userSchema);
