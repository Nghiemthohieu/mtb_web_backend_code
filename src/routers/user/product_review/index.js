"use strict";

const express = require("express");
const { asyncHandler } = require("../../../auth/checkAuth");
const ProductReviewController = require("../../../controllers/product_review.controller");
const multer = require('multer');
const storage = multer.memoryStorage(); // Để upload lên S3 nhanh hơn
const upload = multer({ storage });

const router = express.Router();

router.post("/user_review", upload.fields([
    { name: 'images', maxCount: 10 },
]), asyncHandler(ProductReviewController.UserProductreview));
router.post("/delete/:id", asyncHandler(ProductReviewController.DeleteProductReview));
router.get("/list", asyncHandler(ProductReviewController.getAllProductReviewsByProductId));

module.exports = router;
