const router = require('express').Router();

const authController = require('../controller/auth');
const { catchErrors } = require('../libs/handlers/errors')
const auth = require('../middleware/authentication')

router.post('/check', auth({ required: false }), catchErrors(authController.checkUser));

router.get('/oauth', catchErrors(authController.oAuth));
router.get('/oauth-callback', catchErrors(authController.oAuthCallback));

module.exports = router;