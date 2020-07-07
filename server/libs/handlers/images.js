const fs = require('fs');
const multer = require('multer');
const { pathToUploadFile } = require('../utils');

const dir = pathToUploadFile(['user']);
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

module.exports.multerUpload = function(pathArr = []) {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, pathToUploadFile(pathArr));
		},
		filename: (req, file, cb) => {
			const ext = file.mimetype.split('/')[1];
			cb(null, `${req.user.slug}-${Date.now()}.${ext}`);
		},
	});

	return multer({ storage });
};
