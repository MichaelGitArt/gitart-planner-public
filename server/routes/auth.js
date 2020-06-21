const router = require('express').Router();
const { check } = require('express-validator');

const authController = require('../controller/auth');
const { catchErrors } = require('../libs/handlers/errors');
const auth = require('../middleware/authentication');
const checkSlug = require('../middleware/checkSlug');

router.post(
	'/check',
	auth({ required: false }),
	catchErrors(authController.checkUser),
);

router.post(
	'/logout',
	auth({ required: false }),
	catchErrors(authController.logout),
);

router.get('/oauth', catchErrors(authController.oAuth));
router.get('/oauth-callback', catchErrors(authController.oAuthCallback));

router.post(
	'/profile/:slug',
	auth({ required: false }),
	catchErrors(authController.getProfile),
);
router.post(
	'/checkFreeSlug',
	auth({ required: true }),
	checkSlug,
	catchErrors(authController.checkFreeSlug),
);

router.post(
	'/profile/:slug/update',
	auth({ required: true }),
	checkSlug,
	[
		check('slug')
			.isString()
			.trim(),
		check('name')
			.trim()
			.isLength({ min: 3, max: 30 })
			.withMessage('Від 3 до 30 символів')
			.matches(/^[a-z0-9а-я ]+$/i)
			.withMessage('Лише букви, цифри та пробіли'),
	],
	catchErrors(authController.updateProfile),
);

module.exports = router;
