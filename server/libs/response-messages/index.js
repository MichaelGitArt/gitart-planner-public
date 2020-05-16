module.exports = {
	get auth() {
		return require('./auth.json');
	},
	get errors() {
		return require('./errors.json');
	},
	get group() {
		return require('./group.json');
	},
};
