'use strict';

const { notFoundError } = require('../core/error.response');
const productStyleModel = require('../models/product_style.model');
const logger = require('../utils/logger');
const paginate = require('../utils/paginate');

class ProductStyleService {
    static CreateProductStyle = async (data) => {
        return {data: await productStyleModel.create(data)};
    }
    static GetByProductStyleId = async (id) => {
        return {data: await productStyleModel.findById(id)};
    }
    static GetAllProductStyle = async (query) => {
        return await paginate(productStyleModel, {}, {page: query.page, limit: query.limit});
    }
    static UpdateProductStyle = async (data) => {
        if (!data._id) {
            logger.error('Vui lòng điển _id của size');
            throw new notFoundError('Vui lòng điển _id của size');
        }
        return {data: await productStyleModel.findByIdAndUpdate(data._id, data, {new: true})};
    }
    static DeleteProductStyle = async (id) => {
        return {data: await productStyleModel.findByIdAndDelete(id)};
    }
}

module.exports = ProductStyleService;