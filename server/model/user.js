const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

shortid.characters(process.env.SHORTID_CHARS);

const userSchema = new Schema({
	name: String,
	lastName: String,
	password: String,
	email: {
		type: String,
		lowercase: true,
		required: [true, "can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true
	},
	emailConfirmed: {
		type: Boolean,
		default: false
	},
	slug: {
		type: String,
		default: shortid.generate,
		unique: true,
		index: true
	},
	membership: [{
		type: Schema.Types.ObjectId,
		ref: 'Member',
		required: true
	}]
}, { timestamp: true })

userSchema.methods.getProfileInfo = function () {
	return {
		name: this.name,
		slug: this.slug
	};
};

userSchema.methods.addMembership = function (member) {
	this.membership.push(member._id.toString());
	return this.save();
}

module.exports = mongoose.model('User', userSchema);