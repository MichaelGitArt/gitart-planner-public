const canvas = require('canvas');
const clipper = require('image-clipper');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { minifySpaces, pathToUploadFile } = require('../libs/utils');
const errorMessages = require('../libs/response-messages');
const { cookieUpdate } = require('../libs/cookie');
const User = require('../model/user');

clipper.configure('canvas', canvas);
const client = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	`${process.env.URL2}/api/auth/oauth-callback`,
);

/**
 * Check user
 */
module.exports.checkUser = async (req, res) => {
	const user = req.user;
	if (user) {
		return res.json({
			auth: true,
			user: user.getProfileInfo(),
		});
	}
	return res.json({
		auth: false,
	});
};

module.exports.logout = async (req, res) => {
	cookieUpdate(res, 'jwt', '', { maxAge: 0 });
	res.json({
		success: true,
	});
};

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
		prompt: 'consent',
	});

	res.redirect(authorizeUrl);
};

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
	});

	user.save().then((savedUser) => {
		storeUserJWT(res, savedUser);
		return res.redirect(process.env.URL);
	});
};

module.exports.getProfile = async (req, res) => {
	let slug = req.params.slug;

	if (req.user.slug === slug) {
		return res.json({
			user: {
				...req.user.getProfileInfo(),
				me: true,
			},
		});
	}

	User.findOne({ slug: slug }).then((user) => {
		res.json({
			user: user.getProfileInfo(),
		});
	});
};

module.exports.updateProfile = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty() || !req.slugValidation.status) {
		return res.status(422).json({
			success: false,
			errors: errors.array(),
			slugValidation: req.slugValidation,
		});
	}
	const slug = req.body.slug;
	const name = req.body.name;

	req.user.slug = slug;
	req.user.name = minifySpaces(name);

	req.user.save().then((savedUser) => {
		const profile = savedUser.getProfileInfo();
		res.json({
			success: true,
			user: profile,
		});
	});
};

module.exports.checkFreeSlug = async (req, res) => {
	res.json({
		status: req.slugValidation.status,
		message: req.slugValidation.message,
	});
};

module.exports.uploadAvatar = async (req, res) => {
	const imagePath = pathToUploadFile(['user', req.file.filename]);
	// path.join(appDir, 'server', 'uploads', 'user', req.file.filename);

	clipper(imagePath, function() {
		this.resize(120, 120).toFile(imagePath, async function() {
			req.user.avatar = req.file.filename;
			await req.user.save();

			res.json({
				success: true,
				user: {
					avatar: req.user.avatarPath,
				},
			});
		});
	});
};

function storeUserJWT(res, user) {
	const token = jwt.sign(
		{
			userId: user._id.toString(),
		},
		process.env.JWT_SECRET,
		{ expiresIn: '7d' },
	);
	cookieUpdate(res, 'jwt', token);
}
