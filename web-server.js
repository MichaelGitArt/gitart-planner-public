const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const express = require('express');
const { join } = require("path");
const history = require('connect-history-api-fallback');


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


app.listen(port, () => {
	console.log('Server launched')
})
