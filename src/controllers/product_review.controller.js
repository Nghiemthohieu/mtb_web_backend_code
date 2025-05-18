'use strict';

const { SuccessResponse } = require("../core/success.reponse");
const ProductReviewService = require("../services/product_review.service");

class ProductReviewController {
    static UserProductreview = async (req, res, next) => {
        const metaData = JSON.parse(req.body.data);
        new SuccessResponse({
            message: 'User creaste product review success',
            data: await ProductReviewService.UseProductReview(metaData, req.files)
        }).send(res);
    }

    static ManagerProductreview = async (req, res, next) => {
        new SuccessResponse({
            message: 'Manager creaste product review success',
            data: await ProductReviewService.ManagerProductReview(req.body, req.params.id)
        }).send(res);
    }

    static ManagerUpdateProductReview = async (req, res, next) => {
        new SuccessResponse({
            message: 'Manager update product review success',
            data: await ProductReviewService.UpdateManagerProductReview(req.body, req.params.id)
        }).send(res);
    }

    static getAllProductReviewsByProductId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all product review by productId success',
            data: await ProductReviewService.getAllProductReviewsByProductId(req.params.slug, req.query)
        }).send(res);
    }

    static GetAllProductReview = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all product review success',
            data: await ProductReviewService.GetAllProductReview(req.query)
        }).send(res);
    }

    static GetByProductReviewId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get product review success',
            data: await ProductReviewService.GetByProductReviewId(req.params.id)
        }).send(res);
    }

    static DeleteProductReview = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete product review success',
            data: await ProductReviewService.DeleteProductReview(req.params.id)
        }).send(res);
    }

    static deleteManagerProductReview = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete product review success',
            data: await ProductReviewService.deleteManagerProductReview(req.query)
        }).send(res);
    }
}

module.exports = ProductReviewController;