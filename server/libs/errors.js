const httpErrors = require('http-errors');

const resMessages = require('./response-messages');

module.exports.AuthenticationError = (message = resMessages.errors.authenticationError) => {
	return httpErrors(401, message, { id: 'authentication_required' });
}

module.exports.InvalidRequestError = (message = resMessages.errors.invalidRequestError) => {
	return httpErrors(400, message, { id: 'invalid_request' });
}

module.exports.NotFoundError = (message = resMessages.errors.notFoundError) => {
	return httpErrors(404, message, { id: 'not_found' });
}