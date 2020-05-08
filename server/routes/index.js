const router = require('express').Router();

const authRoutes = require('./auth');
const groupRoutes = require('./group');

router.use('/auth', authRoutes);
router.use('/group/', groupRoutes);

module.exports = router;