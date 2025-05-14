'use strict';

const ProductSizeService = require("../services/product_size.service");
const {SuccessResponse} = require("../core/success.reponse");

class ProductSizeController {
    static CreateProductSize = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Create Product Size success',
            data: await ProductSizeService.CreateProductSize(req.body)
        }).send(res);
    }
    static GetByProductSizeId = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get Product Size success',
            data: await ProductSizeService.GetByProductSizeId(req.params.id)
        }).send(res);
    }
    static GetAllProductSize = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get All Product Size success',
            data: await ProductSizeService.GetAllProductSize(req.query)
        }).send(res);
    }
    static UpdateProductSize = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Update Product Size success',
            data: await ProductSizeService.UpdateProductSize(req.body)
        }).send(res);
    }
    static DeleteProductSize = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Delete Product Size success',
            data: await ProductSizeService.DeleteProductSize(req.params.id)
        }).send(res);
    }
}

module.exports = ProductSizeController