"use strict";

const express = require("express");
const { asyncHandler } = require("../../../auth/checkAuth");
const productCollectionController = require("../../../controllers/product.controller");

const router = express.Router();

router.post("", asyncHandler(productCollectionController.productCollection));

module.exports = router;
