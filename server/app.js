const path = require('path');

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const history = require('connect-history-api-fallback');

const routes = require('./routes');
const { handleErrors } = require('./libs/handlers/errors');

const app = express();

// Security
app.use(helmet());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// upload setup
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
	}),
);

// Setup server for vue spa
app.use(
	history({
		rewrites: [
			{
				from: /^\/uploads.*$/,
				to: function(context) {
					return context.parsedUrl.pathname;
				},
			},
			{
				from: /^\/api\/.*$/,
				to: function(context) {
					return context.parsedUrl.pathname;
				},
			},
		],
	}),
);

// Static folders
app.use(express.static(path.join(__dirname, '../', 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', routes);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	handleErrors(err, res);
});

module.exports = app;
