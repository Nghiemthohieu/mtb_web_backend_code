'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const ManagerController = require('../../../controllers/manager.controller');
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(ManagerController.createManager))

module.exports = router;