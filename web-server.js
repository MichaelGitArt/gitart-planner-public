const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const express = require('express');
const { join } = require("path");

const app = express();

const port = process.env.NODE_ENV === "production" ? process.env.PORT || 3000 : 3001;

// Header protection
app.use(helmet());

// Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// Allow vue dist folder
app.use(express.static(join(__dirname, "dist")));


app.listen(port, () => {
	console.log('Server launched')
})
