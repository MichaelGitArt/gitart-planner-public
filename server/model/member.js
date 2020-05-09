const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	role: {
		type: String,
		required: true,
		enum: ['admin', 'member']
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
		required: true
	},

}, { timestamp: true })

module.exports = mongoose.model('Member', memberSchema);