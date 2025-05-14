'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const product_sizeController = require('../../../controllers/product_size.controller');
const { authentication } = require('../../../auth/authUtils');
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(product_sizeController.CreateProductSize))
router.get('/detail/:id', asyncHandler(product_sizeController.GetByProductSizeId))
router.get('/list', asyncHandler(product_sizeController.GetAllProductSize))
router.put('/update', asyncHandler(product_sizeController.UpdateProductSize))
router.delete('/delete/:id', asyncHandler(product_sizeController.DeleteProductSize))

module.exports = router;