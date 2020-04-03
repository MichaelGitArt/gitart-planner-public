const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const express = require('express');
const app = express();

// Header protection
app.use(helmet());

// Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.get('/', (req, res) => {
	res.json({
		data: 'All good!'
	})
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Server launched')
})
