const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	}
}, { timestamp: true })

module.exports = mongoose.model('User', userSchema);