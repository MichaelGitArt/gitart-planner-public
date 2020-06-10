const jwt = require('jsonwebtoken');

const { AuthenticationError } = require('../libs/errors');
const { cookieExtract } = require('../libs/cookie');

const User = require('../model/user');

module.exports = (customOptions = {}) => {
	if (typeof customOptions !== 'object')
		throw new Error('customOptions must be an object');
	const options = {
		required: true,
		...customOptions,
	};
	return (req, res, next) => {
		let jwtToken = cookieExtract(req).jwt;
		jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
			if (err && options.required) {
				throw AuthenticationError();
			} else if (err) {
				req.user = null;
				next();
			} else {
				User.findById(decoded.userId).then((user) => {
					// user is object or null
					req.user = user;
					next();
				});
			}
		});
	};
};
