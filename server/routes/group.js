const router = require('express').Router();
const groupController = require('../controller/group');
const { catchErrors } = require('../libs/handlers/errors');

const auth = require('../middleware/authentication');

router.post(
	'/get',
	auth({ required: true }),
	catchErrors(groupController.getGroups),
);
router.post(
	'/get/:code',
	auth({ required: true }),
	catchErrors(groupController.getGroup),
);
router.post(
	'/create',
	auth({ required: true }),
	catchErrors(groupController.createGroup),
);
router.post(
	'/join',
	auth({ required: true }),
	catchErrors(groupController.joinGroup),
);
router.post(
	'/removeMember',
	auth({ required: true }),
	catchErrors(groupController.removeMember),
);

module.exports = router;
