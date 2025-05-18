'use strict';

const { BadRequestError, notFoundError } = require("../core/error.response");
const { populate } = require("../models/category.model");
const productModel = require("../models/product.model");
const { decodeBase64Image } = require("../utils/base64");
const logger = require("../utils/logger");
const paginate = require("../utils/paginate");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");

class ProductService {
    static CreateProduct = async (data) => {
        if (data.product_variants == null) {
            logger.error("Hãy thêm đây đủ thông tin vào product_variants");
            throw new BadRequestError("Hãy thêm đây đủ thông tin vào product_variants");
        }
        return { data: await productModel.create(data) };
    }

    static GetByProductId = async (id) => {
        return { data: await productModel.findById(id) };
    }

    static GetAllProduct = async (query) => {
        return await paginate(productModel, {}, {
            page: query.page, limit: query.limit, populate: [
                { path: 'size', select: 'size' },
                { path: 'color', select: 'color colorImage' },
                { path: 'categories', select: 'name' },
            ],
            sort: { createdAt: -1 }
        });
    }

    static updateProduct = async (data) => {
        if (!data._id) {
            logger.error('Vui lòng điển _id của size');
            throw new notFoundError('Vui lòng điển _id của size');
        }

        return { data: await productModel.findByIdAndUpdate(data._id, data, { new: true }) };
    }

    static deleteProduct = async (id) => {
        return { data: await productModel.findByIdAndDelete(id) };
    }

    static getProductByStyle = async (query) => {
        const products = await productModel.find({
            product_style: query.styleId,
            product_images: { $elemMatch: { is_main: true } }
        })
            .limit(query.limit || 10)
            .populate('size', 'size')
            .populate('color', 'color colorImage')
            .populate('categories', 'name')
            .lean(); // => để kết quả là object thường, dễ thao tác

        // Lọc chỉ giữ ảnh có is_main: true
        const filteredProducts = products.map(product => {
            return {
                ...product,
                product_images: product.product_images.filter(img => img.is_main)
            }
        });

        return { data: filteredProducts };
    }
    static getProductByColor = async (colorId) => {
        return { data: await productModel.findOne(colorId) };
    }

    static UpdateProductImages = async (productId, files, metaData) => {
        const product = await productModel.findById(productId);
        if (!product) {
            logger.error("Không tìm thayas sản phẩm");
            throw new notFoundError("Không tìm thấy sản phẩm");
        };

        const images = files['images'] || [];
        const hoverImages = files['hoverImages'] || [];

        const uploadedImages = await Promise.all(
            images.map((file) =>
                uploadFileToS3(file.buffer, file.originalname, file.mimetype)
            )
        );

        const uploadedHoverImages = await Promise.all(
            hoverImages.map((file) =>
                uploadFileToS3(file.buffer, file.originalname, file.mimetype)
            )
        );

        const productImages = uploadedImages.map((url, idx) => {
            const isMain = idx === 0;
            return {
                url,
                is_main: isMain,
                color: metaData.color || null,
                img_hover: isMain ? (uploadedHoverImages[idx] || '') : '',
                alt_text: `Image ${idx + 1}`,
                alt_text_hover: isMain ? `Hover ${idx + 1}` : '',
            };
        });

        product.product_images = [...product.product_images, ...productImages];
        await product.save();

        return product;
    };

    static productCollection = async (query) => {
        const {
            page = 1,
            limit = 10,
            size,
            color,
            product_material,
            product_style,
            sort,
        } = query;

        const filter = omitUndefined({
            size,
            color,
            product_material,
            product_style,
        });

        const sortOptions = {
            bestselling: { sold_total: -1 }, // Sắp xếp theo số lượng bán nhiều nhất (giảm dần)
            newest: { createdAt: -1 }, // Sắp xếp theo sản phẩm mới nhất (thời gian tạo giảm dần)
            price_high_to_low: { price: -1 }, // Sắp xếp theo giá từ cao đến thấp
            price_low_to_high: { price: 1 }, // Sắp xếp theo giá từ thấp đến cao
            discount_high_to_low: { discount: -1 }, // Sắp xếp theo phần trăm giảm giá từ cao đến thấp
        };

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: sortOptions[sort] || { createdAt: -1 },
        };

        return { data: await paginate(productModel, filter, options) };
    };
}

module.exports = ProductService