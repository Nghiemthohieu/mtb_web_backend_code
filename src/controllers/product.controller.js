'use strict';
const { SuccessResponse } = require('../core/success.reponse');
const ProductService = require('../services/product.service');
class ProductController {
    static CreateProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create product success',
            data: await ProductService.CreateProduct(req.body)
        }).send(res);
    }

    static GetByProductId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get product success',
            data: await ProductService.GetByProductId(req.params.id)
        }).send(res);
    }

    static GetAllProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all product success',
            data: await ProductService.GetAllProduct(req.query)
        }).send(res);
    }

    static UpdateProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update product success',
            data: await ProductService.UpdateProduct(req.body)
        }).send(res);
    }

    static DeleteProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete product success',
            data: await ProductService.deleteProduct(req.params.id)
        }).send(res);
    }
    static getProductByMaterial = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get product by material success',
            data: await ProductService.getProductByMaterial(req.query)
        }).send(res);
    }
    static CreateProductImage = async (req, res) => {
        const productId = req.params.id;
        const files = req.files;
        const metaData = JSON.parse(req.body.data); // req.body.data là JSON string

        const result = await ProductService.UpdateProductImages(productId, files, metaData);

        new SuccessResponse({
            message: 'Upload ảnh thành công',
            data: result
        }).send(res);
    };
}

module.exports = ProductController;