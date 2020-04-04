const TWO_DAYS_IN_MILLISECONDS = 172800000 // 1000 * 60 * 60 * 24 * 2

module.exports.cookieUpdate = (res, cookieName, value) => {
	res.cookie(cookieName, value, { maxAge: TWO_DAYS_IN_MILLISECONDS * 24 * 7, httpOnly: true, secure: process.env.NODE_ENV === "production" })
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