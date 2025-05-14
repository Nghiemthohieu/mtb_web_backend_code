'use strict';
const { notFoundError } = require('../core/error.response');
const productmaterialsModel = require('../models/productmaterials.model');
const logger = require('../utils/logger');
const paginate = require('../utils/paginate');
class ProductMaterialsService {
    static CreateProductMaterials = async (data) => {
        return {data: await productmaterialsModel.create(data)};
    }
    static GetBYProductMaterialsId = async (id) => {
        return {data: await productmaterialsModel.findById(id)};
    }
    static GetAllProductMaterials = async (query) => {
        return await paginate(productmaterialsModel, {}, {page: query.page, limit: query.limit});
    }
    static UpdateProductMaterials = async (data) => {
        if (!data._id) {
            logger.error('Vui lòng điển _id của size');
            throw new notFoundError('Vui lòng điển _id của size');
        }
        return {data: await productmaterialsModel.findByIdAndUpdate(data._id, data, {new: true})};
    }
    static DeleteProductMaterials = async (id) => {
        return {data: await productmaterialsModel.findByIdAndDelete(id)};
    }
}

module.exports = ProductMaterialsService;