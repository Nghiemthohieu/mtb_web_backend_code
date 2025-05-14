'use strict';

const express = require('express');
const access_userController = require('../../../controllers/access_user.controller');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const router = express.Router();

router.post('/signup',asyncHandler(access_userController.signUp))
router.post('/login',asyncHandler(access_userController.login))

//authentication
router.use(authentication);

router.post('/logout',asyncHandler(access_userController.logout))
router.post('/handlerRefreshToken',asyncHandler(access_userController.handlerRefreshToken))

module.exports = router;