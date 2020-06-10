const User = require('../model/user');

module.exports = async (req, res, next) => {
	const slug = req.body.slug.trim();

	// Check if  it is yours
	if (slug === req.user.slug) {
		req.slugValidation = {
			status: true,
			message: 'Це твій нік',
		};
		return next();
	}

	// Right length
	if (!slug || slug.length < 5 || slug.length > 20) {
		req.slugValidation = {
			status: false,
			message: 'Нік має бути 5 від 20 символів',
		};
		return next();
	}

	// Check for allowed characters
	let charCheck = true;
	slug.split('').forEach((char) => {
		if (!process.env.SHORTID_CHARS.toLocaleLowerCase().includes(char)) {
			charCheck = false;
		}
	});
	if (!charCheck) {
		req.slugValidation = {
			status: false,
			message: 'Для зміни ніку доступні лише цифри, малі букви та ".", "_"',
		};
		return next();
	}

	// Check id availability
	const user = await User.findOne({ slug });
	if (user) {
		req.slugValidation = {
			status: false,
			message: 'Нік зайнятий',
		};
		return next();
	}

	// After all checks return positive result
	req.slugValidation = {
		status: true,
	};
	next();
};
