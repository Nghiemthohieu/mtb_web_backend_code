'use strict';

const { SuccessResponse } = require("../core/success.reponse");
const ProductMaterialsService = require("../services/product_materials.service");

class ProductMaterialsController {
    static CreateProductMaterials = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Create Product Materials success',
            data: await ProductMaterialsService.CreateProductMaterials(req.body)
        }).send(res);
    }

    static GetByProductMaterialsId = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get Product Materials success',
            data: await ProductMaterialsService.GetBYProductMaterialsId(req.params.id)
        }).send(res);
    }

    static GetAllProductMaterials = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get All Product Materials success',
            data: await ProductMaterialsService.GetAllProductMaterials(req.query)
        }).send(res);
    }

    static UpdateProductMaterials = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Update Product Materials success',
            data: await ProductMaterialsService.UpdateProductMaterials(req.body)
        }).send(res);
    }

    static DeleteProductMaterials = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Delete Product Materials success',
            data: await ProductMaterialsService.DeleteProductMaterials(req.params.id)
        }).send(res);
    }
}

module.exports = ProductMaterialsController;