'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// router.use(apiKey);

// router.use(permission('1111'));

router.use('/v1/api', require('./user'))
router.use('/v1/api/admin', require('./manager'))

module.exports = router;