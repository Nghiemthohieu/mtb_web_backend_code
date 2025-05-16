'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const ProductController = require('../../../controllers/product.controller');
// const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(ProductController.CreateProduct))
router.get('/detail/:id', asyncHandler(ProductController.GetByProductId))
router.get('/list', asyncHandler(ProductController.GetAllProduct))
router.put('/update', asyncHandler(ProductController.UpdateProduct))
router.delete('/delete/:id', asyncHandler(ProductController.DeleteProduct))

module.exports = router;