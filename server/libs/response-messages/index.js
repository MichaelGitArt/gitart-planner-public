module.exports = {
	get auth() {
		return require('./auth')
	},
	get errors() {
		return require('./errors')
	}
}