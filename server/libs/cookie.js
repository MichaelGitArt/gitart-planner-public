const TWO_DAYS_IN_MILLISECONDS = 172800000 // 1000 * 60 * 60 * 24 * 2

module.exports.cookieUpdate = (res, cookieName, value, customParams) => {
	let params = {
		maxAge: TWO_DAYS_IN_MILLISECONDS,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		...customParams
	};

	res.cookie(cookieName, value, params)
};

module.exports.cookieExtract = (req) => {
	var list = {},
		rc = req.headers.cookie;

	rc && rc.split(';').forEach((cookie) => {
		let parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});

	return list;
};