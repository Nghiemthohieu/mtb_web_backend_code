'use strict';

const { notFoundError } = require("../core/error.response");
const product_colorModel = require("../models/product_color.model");
const { decodeBase64Image } = require("../utils/base64");
const logger = require("../utils/logger");
const paginate = require("../utils/paginate");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");

class ProductColorService {

    static DeleteProductColor = async (id) => {
        return {data: await product_colorModel.findByIdAndDelete(id)};
    }

    static UpdateProductColor = async (data) => {
        if (!data._id) {
            logger.error('Vui lòng điền _id của size');
            throw new notFoundError('Vui lòng điền _id của size');
        }
        let colorImage = decodeBase64Image(data.colorImage);
        data.colorImage = await uploadFileToS3(colorImage);
        return {data: await product_colorModel.findByIdAndUpdate(data._id, data, {new: true})};
    }
    
    static createProductColor = async (data) => {
        let colorImage = decodeBase64Image(data.colorImage);
        data.colorImage = await uploadFileToS3(colorImage);
        return {data: await product_colorModel.create(data)};
    }

    static GetByProductColorId = async (id) => {
        return {data: await product_colorModel.findById(id)};
    }

    static GetAllProductColor = async (query) => {
        return await paginate(product_colorModel, {}, {page: query.page, limit: query.limit});
    }
}

module.exports = ProductColorService;