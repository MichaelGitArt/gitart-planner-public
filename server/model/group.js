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
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		role: {
			type: String,
			required: true,
			enum: ['admin', 'member']
		}
	}]
}, { timestamp: true })

module.exports = mongoose.model('Group', groupSchema);