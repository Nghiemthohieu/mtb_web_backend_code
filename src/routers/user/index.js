'use strict';

const express = require('express');
const router = express.Router();

router.use('/access_user', require('./access_user'))

module.exports = router;