// const errorMessages = require('@server/libs/response-messages');
const errorMessages = require('../response-messages');

/**
 * Instead of using try{} catch(e){} in each controller, we wrap functions in
 * catchErrors(), catch any errors throw and pass it along with next
 */
module.exports.catchErrors = (fn) => {
	return function(req, res, next) {
		return fn(req, res, next).catch((err) => {
			next(err);
		});
	};
};

/**
 * Central error handling
 */
module.exports.handleErrors = (err, res) => {
	console.log(err);
	const { statusCode, message } = err;
	console.log(statusCode);
	console.log(message);
	const returnObj = {
		success: false,
		statusCode: statusCode || 500,
		message: !statusCode
			? errorMessages.errors.unexpectedError
			: message || errorMessages.errors.unexpectedError,
	};
	if (err['validation']) {
		returnObj.validation = err['validation'];
	}
	res.status(statusCode || 500).json(returnObj);
};
