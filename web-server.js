const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const express = require('express');
const { join } = require("path");
const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const { handleErrors } = require('./server/libs/handlers/errors');

const routes = require('./server/routes');

if (process.env.NODE_ENV === "development") {
	dotenv.config({ path: './.env.local' });
}

const app = express();

const port = process.env.NODE_ENV === "production" ? process.env.PORT || 3000 : 3001;

// Header protection
app.use(helmet());

// Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// Setup server for vue spa
app.use(history({
	rewrites: [{
		from: /^\/api\/.*$/,
		to: function (context) {
			return context.parsedUrl.pathname;
			// return '/dist' + context.parsedUrl.pathname;
		}
	}]
}));

// Allow vue dist folder
app.use(express.static(join(__dirname, "dist")));

app.use('/api', routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	handleErrors(err, res);
});

mongoose.connect(process.env.MONGODB_URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		app.listen(port, () => {
			console.log('Server launched')
		})
	})
	.catch(err => console.log(err))