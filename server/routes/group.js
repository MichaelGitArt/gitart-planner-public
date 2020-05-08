const router = require('express').Router();
const groupController = require('../controller/group');

const auth = require('../middleware/authentication');

router.post('/create', auth({ required: true }), groupController.createGroup);

module.exports = router;