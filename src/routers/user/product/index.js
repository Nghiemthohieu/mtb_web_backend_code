'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const ProductController = require('../../../controllers/product.controller');
const router = express.Router();

// router.use(authentication);
router.get('/list_material', asyncHandler(ProductController.getProductByMaterial))

module.exports = router;