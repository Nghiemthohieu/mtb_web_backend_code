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
        const colorId = req.params.id;
        const files = req.files;
        const metaData = JSON.parse(req.body.data);
        return new SuccessResponse({
            message: 'Update Product Color success',
            data: await ProductColorService.UpdateProductColor(colorId, files, metaData)
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
        const metaData = JSON.parse(req.body.data);
        return new SuccessResponse({
            message: 'Create Product Color success',
            data: await ProductColorService.createProductColor(req.files, metaData)
        }).send(res);
    }
}

module.exports = ProductColorController