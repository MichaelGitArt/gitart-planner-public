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
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true,
					unique: true,
				},
				role: {
					type: String,
					required: true,
					enum: ['admin', 'member'],
				},
			},
		],
	},
	{ timestamp: true },
);

module.exports = mongoose.model('Group', groupSchema);
