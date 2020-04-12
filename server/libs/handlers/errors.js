/**
 * Instead of using try{} catch(e){} in each controller, we wrap functions in
 * catchErrors(), catch any errors ther throw? and pass it along with next
 */
module.exports.catchErrors = (fn) => {
	return function (req, res, next) {
		return fn(req, res, next)
			.catch(err => {
				next(err);
			})
	}
}

/**
 * Centrall error handling
 */
module.exports.handleErrors = (err, res) => {
	const { statusCode, message } = err;
	res.status(statusCode || 500).json({
		status: "error",
		statusCode: statusCode || 500,
		message
	});
}