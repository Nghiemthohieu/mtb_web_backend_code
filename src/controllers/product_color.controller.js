'use struct';

const { SuccessResponse } = require("../core/success.reponse");
const ProductColorService = require("../services/product_color.service");

class ProductColorController {

    static DeleteProductColor = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Delete Product Color success',
            data: await ProductColorService.DeleteProductColor(req.params.id)
        }).send(res);
    }

    static UpdateProductColor = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Update Product Color success',
            data: await ProductColorService.UpdateProductColor(req.body)
        }).send(res);
    }

    static GetAllProductColor = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get All Product Color success',
            data: await ProductColorService.GetAllProductColor(req.query)
        }).send(res);
    }

    static GetByProductColorId = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get Product Color success',
            data: await ProductColorService.GetByProductColorId(req.params.id)
        }).send(res);
    }

    static CreateProductColor = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Create Product Color success',
            data: await ProductColorService.createProductColor(req.body)
        }).send(res);
    }
}

module.exports = ProductColorController