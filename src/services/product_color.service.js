'use strict';

const { notFoundError } = require("../core/error.response");
const product_colorModel = require("../models/product_color.model");
const { decodeBase64Image } = require("../utils/base64");
const logger = require("../utils/logger");
const paginate = require("../utils/paginate");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");

class ProductColorService {

    static DeleteProductColor = async (id) => {
        return { data: await product_colorModel.findByIdAndDelete(id) };
    }

    static UpdateProductColor = async (colorId, files, data) => {
        const color = await product_colorModel.findById(colorId);
        if (!color) {
            logger.error("Color not found");
            throw new NotFoundError("Color not found");
        }

        let uploadedImage = color.colorImage; // giữ ảnh cũ nếu không có ảnh mới

        const color_image = files['color_image'] || [];

        if (color_image.length > 0) {
            uploadedImage = await uploadFileToS3(
                color_image[0].buffer,
                color_image[0].originalname,
                color_image[0].mimetype
            );
        }

        const updatedData = {
            ...data,
            colorImage: uploadedImage
        };

        const updatedColor = await product_colorModel.findByIdAndUpdate(
            colorId,
            updatedData,
            { new: true }
        );

        return { data: updatedColor };
    };

    static createProductColor = async (files, metaData) => {
        try {
            // Lấy file ảnh từ field "color_image"
            const colorImageFiles = files['color_image'] || [];

            // Kiểm tra nếu không có file
            if (colorImageFiles.length === 0) {
                throw new BadRequestError('Không có ảnh màu được upload');
            }

            // Upload ảnh đầu tiên (vì chỉ có 1 ảnh màu)
            const uploadedImage = await uploadFileToS3(
                colorImageFiles[0].buffer,
                colorImageFiles[0].originalname,
                colorImageFiles[0].mimetype
            );

            // Tạo dữ liệu lưu vào MongoDB
            const data = {
                ...metaData,
                colorImage: uploadedImage
            };

            const createdColor = await product_colorModel.create(data);
            return { data: createdColor };

        } catch (err) {
            throw new Error(`Tạo color thất bại: ${err.message}`);
        }
    };

    static GetByProductColorId = async (id) => {
        return { data: await product_colorModel.findById(id) };
    }

    static GetAllProductColor = async (query) => {
        return await paginate(product_colorModel, {}, { page: query.page, limit: query.limit });
    }
}

module.exports = ProductColorService;