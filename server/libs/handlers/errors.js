const errorMessages = require('@server/libs/response-messages');

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
	const { statusCode, message } = err;
	let defMessage;
	switch (statusCode) {
		case 404:
			defMessage = errorMessages.errors.notFoundError;
			break;
		case 403:
			defMessage = errorMessages.errors.accessDenied;
			break;
		default:
			defMessage = errorMessages.errors.errorMessages.errors.unexpectedError;
	}

	res.status(statusCode || 500).json({
		success: false,
		statusCode: statusCode || 500,
		originalError: message,
		message: defMessage,
	});
};
