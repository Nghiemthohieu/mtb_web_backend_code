"use strict";

const express = require("express");
const { asyncHandler } = require("../../../auth/checkAuth");
const ProductReviewController = require("../../../controllers/product_review.controller");

const router = express.Router();

router.post("/manager_reponse/:id", asyncHandler(ProductReviewController.ManagerProductreview));
router.post("/manager_reponse_update/:id", asyncHandler(ProductReviewController.ManagerUpdateProductReview));
router.post("/manager_reponse_delete", asyncHandler(ProductReviewController.deleteManagerProductReview));
router.post("/delete/:id", asyncHandler(ProductReviewController.DeleteProductReview));
router.get("/list", asyncHandler(ProductReviewController.GetAllProductReview));
router.get("/detail/:id", asyncHandler(ProductReviewController.GetByProductReviewId));

module.exports = router;
