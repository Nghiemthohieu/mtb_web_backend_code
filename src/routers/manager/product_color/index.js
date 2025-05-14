'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const product_colorController = require('../../../controllers/product_color.controller');
const { authentication } = require('../../../auth/authUtils');
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(product_colorController.CreateProductColor))
router.get('/detail/:id', asyncHandler(product_colorController.GetByProductColorId))
router.get('/list', asyncHandler(product_colorController.GetAllProductColor))
router.put('/update', asyncHandler(product_colorController.UpdateProductColor))
router.delete('/delete/:id', asyncHandler(product_colorController.DeleteProductColor))

module.exports = router;