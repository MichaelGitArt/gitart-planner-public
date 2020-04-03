const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const express = require('express');
const { join } = require("path");

const app = express();

// Header protection
app.use(helmet());

// Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(express.static(join(__dirname, "dist")));

app.get('/api', (req, res) => {
	res.json({
		data: 'All good!'
	})
});

app.get('/api/gettoken', (req, res) => {
	res.cookie('tokenq', '1', { maxAge: 3600000 * 24 * 7, httpOnly: true, secure: process.env.NODE_ENV === "production" });

	res.json({
		data: 'All good!'
	})
});

app.get('/api/gettoken2', (req, res) => {
	res.cookie('token2', '1', { maxAge: 3600000 * 24 * 7, httpOnly: true, secure: process.env.NODE_ENV === "production" });

	res.redirect('/');
})

app.post('/api/action', (req, res) => {
	function cookieExtract(request) {
		var list = {},
			rc = request.headers.cookie;

		rc && rc.split(';').forEach(function (cookie) {
			var parts = cookie.split('=');
			list[parts.shift().trim()] = decodeURI(parts.join('='));
		});

		return list;
	}
	
	let cookies = cookieExtract(req);
	console.log(`cookies.tokenq`, cookies.tokenq);
	let data;
	if (Number(cookies.tokenq) === 1) {
		data = '1 success!'
	} else {
		data = '1 failed'
	}
	if (Number(cookies.token2) === 1) {
		data += ' | 2 success!'
	} else {
		data += ' | 2 failed'
	}
	res.json({
		success: true,
		data
	})
})

app.listen(process.env.PORT || 3000, function () {
	console.log('Server launched')
})
