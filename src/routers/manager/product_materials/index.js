'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const ProductMaterialsController = require('../../../controllers/product_materials.controller');
const router = express.Router();

// router.use(authentication);
router.post('/create', asyncHandler(ProductMaterialsController.CreateProductMaterials))
router.get('/detail/:id', asyncHandler(ProductMaterialsController.GetByProductMaterialsId))
router.get('/list', asyncHandler(ProductMaterialsController.GetAllProductMaterials))
router.put('/update', asyncHandler(ProductMaterialsController.UpdateProductMaterials))
router.delete('/delete/:id', asyncHandler(ProductMaterialsController.DeleteProductMaterials))

module.exports = router;