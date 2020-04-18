const router = require('express').Router();

const authController = require('../controller/auth');
const { catchErrors } = require('../libs/handlers/errors')
const auth = require('../middleware/authentication')

router.post('/check', auth({ required: false }), catchErrors(authController.checkUser));

router.post('/logout', auth({ required: false }), catchErrors(authController.logout));

router.get('/oauth', catchErrors(authController.oAuth));
router.get('/oauth-callback', catchErrors(authController.oAuthCallback));

router.post('/profile/:slug', auth({ required: false }), catchErrors(authController.getProfile));

module.exports = router;