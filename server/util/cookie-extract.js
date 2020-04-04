function cookieExtract(req) {
	var list = {},
		rc = req.headers.cookie;

	rc && rc.split(';').forEach((cookie) => {
		let parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});

	return list;
}

export default cookieExtract;