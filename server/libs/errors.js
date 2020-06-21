const httpErrors = require('http-errors');

const resMessages = require('./response-messages');

module.exports.AuthenticationError = (
	message = resMessages.errors.authenticationError,
) => {
	return httpErrors(401, message, { id: 'authentication_required' });
};

module.exports.InvalidRequestError = (
	message = resMessages.errors.invalidRequestError,
) => {
	return httpErrors(400, message, { id: 'invalid_request' });
};

module.exports.NotFoundError = (message = resMessages.errors.notFoundError) => {
	return httpErrors(404, message, {
		id: 'not_found',
	});
};

module.exports.AccessDenied = (message = resMessages.errors.accessDenied) => {
	return httpErrors(403, message, { id: 'access_denied' });
};

module.exports.ValidationError = (
	message = resMessages.errors.validationError,
	validationObj,
) => {
	return httpErrors(400, message, {
		id: 'validation_error',
		validation: validationObj,
	});
};

module.exports.UnexpectedError = (
	message = resMessages.errors.unexpectedError,
) => {
	return httpErrors(500, message, { id: 'unexpected_error' });
};
