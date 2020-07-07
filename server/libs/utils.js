const path = require('path');
const appDir = path.dirname(require.main.filename);

module.exports.minifySpaces = (str) => {
	if (typeof str !== 'string') throw new Error();
	return str.replace(/\s\s+/g, ' ');
};

module.exports.pathToUploadFile = (pathArr = []) => {
	return path.join(appDir, 'server', 'uploads', ...pathArr);
};
