'use strict';

const { SuccessResponse } = require('../core/success.reponse');
const ProductStyleService = require('../services/product_style.service');

class ProductStyleController {
    
    static CreateProductStyle = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Create Product Style success',
            data: await ProductStyleService.CreateProductStyle(req.body)
        }).send(res);
    }

    static GetByProductStyleId = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get Product Style success',
            data: await ProductStyleService.GetByProductStyleId(req.params.id)
        }).send(res);
    }

    static GetAllProductStyle = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get All Product Style success',
            data: await ProductStyleService.GetAllProductStyle(req.query)
        }).send(res);
    }

    static UpdateProductStyle = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Update Product Style success',
            data: await ProductStyleService.UpdateProductStyle(req.body)
        }).send(res);
    }

    static DeleteProductStyle = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Delete Product Style success',
            data: await ProductStyleService.DeleteProductStyle(req.params.id)
        }).send(res);
    }

}

module.exports = ProductStyleController;