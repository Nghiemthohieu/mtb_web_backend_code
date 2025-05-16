'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const product_colorController = require('../../../controllers/product_color.controller');
const { authentication } = require('../../../auth/authUtils');
const multer = require('multer');
const storage = multer.memoryStorage(); // Để upload lên S3 nhanh hơn
const upload = multer({ storage });
const router = express.Router();

// router.use(authentication);
router.post('/create', upload.fields([
    { name: 'color_image', maxCount: 1 },
]), asyncHandler(product_colorController.CreateProductColor))
router.get('/detail/:id', asyncHandler(product_colorController.GetByProductColorId))
router.get('/list', asyncHandler(product_colorController.GetAllProductColor))
router.put('/updat/:id', upload.fields([
    { name: 'color_image', maxCount: 1 },
]), asyncHandler(product_colorController.UpdateProductColor))
router.delete('/delete/:id', asyncHandler(product_colorController.DeleteProductColor))

module.exports = router;