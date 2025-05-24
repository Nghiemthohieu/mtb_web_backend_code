'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const ProductController = require('../../../controllers/product.controller');
const router = express.Router();

// router.use(authentication);
router.get('/list_style', asyncHandler(ProductController.getProductByStyle))
router.get('/detail', asyncHandler(ProductController.GetProductBySlugAndColor))

module.exports = router;