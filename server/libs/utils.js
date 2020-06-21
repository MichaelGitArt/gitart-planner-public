module.exports.minifySpaces = (str) => {
	if (typeof str !== 'string') throw new Error();
	return str.replace(/\s\s+/g, ' ');
};
