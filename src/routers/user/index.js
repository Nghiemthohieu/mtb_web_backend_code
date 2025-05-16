'use strict';

const express = require('express');
const router = express.Router();

router.use('/access_user', require('./access_user'))
router.use('/category', require('./category'))
router.use('/product', require('./product'))

module.exports = router;