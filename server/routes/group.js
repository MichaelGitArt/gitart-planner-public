const router = require('express').Router();
const groupController = require('../controller/group');

const auth = require('../middleware/authentication');

router.post('/get', auth({ required: true }), groupController.getGroups);
router.post('/get/:code', auth({ required: true }), groupController.getGroup);
router.post('/create', auth({ required: true }), groupController.createGroup);

module.exports = router;
