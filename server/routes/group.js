const router = require('express').Router();
const groupController = require('../controller/group');

const auth = require('../middleware/authentication');

router.post('/get', auth({ required: true }), groupController.getGroups)
router.post('/create', auth({ required: true }), groupController.createGroup);

module.exports = router;