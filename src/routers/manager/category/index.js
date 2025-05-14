'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const CategoryController = require('../../../controllers/category.controller');
const { authentication } = require('../../../auth/authUtils');
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(CategoryController.CreateCategory))
router.get('/detail/:id', asyncHandler(CategoryController.G))
router.get('/list', asyncHandler(CategoryController.GetAllCategory))
router.put('/update', asyncHandler(CategoryController.UpdateCategory))
router.delete('/delete/:id', asyncHandler(CategoryController.DeleteCategory))

module.exports = router;