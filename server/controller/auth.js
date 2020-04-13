const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const errorMessages = require('../libs/response-messages');
const { cookieUpdate } = require('../libs/cookie');
const User = require('../model/user');

const client = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	`${process.env.URL2}/api/auth/oauth-callback`
);

/**
 * Check user
 */
module.exports.checkUser = async (req, res) => {
	const user = req.user;
	if (user) {
		return res.json({
			auth: true,
			user: {
				name: user.name
			}
		})
	}
	return res.json({
		auth: false
	})
};

module.exports.logout = async (req, res) => {
	cookieUpdate(res, 'jwt', '', { maxAge: 0 });
	res.json({
		success: true
	});
}

/**
 * OAuth section
 */
module.exports.oAuth = async (req, res) => {
	const authorizeUrl = client.generateAuthUrl({
		access_type: 'offline',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		],
		prompt: 'consent'
	})

	res.redirect(authorizeUrl);
}

module.exports.oAuthCallback = async (req, res) => {
	const { code } = req.query;
	const unclearErrorRedirect = `${process.env.URL}auth?error=${errorMessages.auth.googleFailed}`;

	if (!code) res.redirect(unclearErrorRedirect);

	const response = await client.getToken(code);
	client.setCredentials(response.tokens);

	const profile = await client.request({
		url: 'https://www.googleapis.com/oauth2/v1/userinfo',
	});

	if (!profile.data) res.redirect(unclearErrorRedirect);

	const existUser = await User.findOne({ email: profile.data.email });
	if (existUser) {
		storeUserJWT(res, existUser);
		return res.redirect(process.env.URL);
	}

	const user = new User({
		name: profile.data.name,
		email: profile.data.email,
		emailConfirmed: profile.data.verified_email,
	})

	user.save()
		.then(savedUser => {
			storeUserJWT(res, savedUser);
			return res.redirect(process.env.URL);
		})
}


function storeUserJWT(res, user) {
	const token = jwt.sign({
		userId: user._id.toString()
	}, process.env.JWT_SECRET, { expiresIn: '7d' });
	cookieUpdate(res, 'jwt', token);
}