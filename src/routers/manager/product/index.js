'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const ProductController = require('../../../controllers/product.controller');
const multer = require('multer');
const storage = multer.memoryStorage(); // Để upload lên S3 nhanh hơn
const upload = multer({ storage });
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(ProductController.CreateProduct))
router.get('/detail/:id', asyncHandler(ProductController.GetByProductId))
router.get('/list', asyncHandler(ProductController.GetAllProduct))
router.put('/update', asyncHandler(ProductController.UpdateProduct))
router.delete('/delete/:id', asyncHandler(ProductController.DeleteProduct))
router.patch('/create_img/:id', upload.fields([
  { name: 'images', maxCount: 20 },
  { name: 'hoverImages', maxCount: 10 }
]), asyncHandler(ProductController.CreateProductImage))

module.exports = router;