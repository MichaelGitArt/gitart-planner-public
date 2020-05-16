const shortId = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Group', groupSchema);
