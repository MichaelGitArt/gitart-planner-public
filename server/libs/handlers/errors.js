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

	res.status(statusCode || 500).json({
		success: false,
		statusCode: statusCode || 500,
		message: message || errorMessages.errors.unexpectedError,
	});
};
