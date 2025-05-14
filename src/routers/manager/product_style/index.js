'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const ProductStyleController = require('../../../controllers/product_style.controller');
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(ProductStyleController.CreateProductStyle))
router.get('/detail/:id', asyncHandler(ProductStyleController.GetByProductStyleId))
router.get('/list', asyncHandler(ProductStyleController.GetAllProductStyle))
router.put('/update', asyncHandler(ProductStyleController.UpdateProductStyle))
router.delete('/delete/:id', asyncHandler(ProductStyleController.DeleteProductStyle))

module.exports = router;