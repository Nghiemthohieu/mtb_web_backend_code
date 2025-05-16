'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const CategoryController = require('../../../controllers/category.controller');
const { authentication } = require('../../../auth/authUtils');
const router = express.Router();

// router.use(authentication);
router.get('/list_home/:id', asyncHandler(CategoryController.GetHomeCategory))
router.get('/list_navbar', asyncHandler(CategoryController.GetNavbarCategory))

module.exports = router;