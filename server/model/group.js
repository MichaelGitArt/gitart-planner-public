const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

shortid.characters(process.env.SHORTID_CHARS);

const groupSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	code: {
		type: String,
		default: shortid.generate,
		unique: true,
		index: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'Member',
		required: true
	}]
}, { timestamp: true })

module.exports = mongoose.model('Group', groupSchema);