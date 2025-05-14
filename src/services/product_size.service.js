'use strict'

const ProductSize = require('../models/product_size.model');
const mongoose = require('mongoose');
const { DuplicateError, notFoundError } = require('../core/error.response');
const paginate = require('../utils/paginate');
const logger = require('../utils/logger');
class ProductSizeService {
    static CreateProductSize = async (data) => {
        const exists = await this.GetBySize(data.size);
        if (exists) {
            logger.error('Size này đã tồn tại!!');
            throw new DuplicateError('Size này đã tồn tại!!');
        }
        return {
            data: await ProductSize.create(data)
        };
    }

    static GetBySize = async (size) => {
        return await ProductSize.findOne({size}).lean();
    }

    static GetByProductSizeId = async (id) => {
        return {data: await ProductSize.findById(id).lean()};
    }

    static GetAllProductSize = async (query) => {
        return await paginate(
            ProductSize,
            {}, // query điều kiện (ví dụ: { status: 'active' }) — ở đây là lấy tất cả
            {
                page: query.page,
                limit: query.limit,
                sort: { createdAt: 1 }
            }
        );
    }

    static UpdateProductSize = async (data) => {
        if (!data._id) {
            logger.error('Vui lòng điền _id của size');
            throw new notFoundError('Vui lòng điền _id của size');
        }

        // Kiểm tra trùng size nếu đang đổi tên size
        const existing = await ProductSize.findOne({ size: data.size, _id: { $ne: data._id } });
        if (existing) {
            logger.error('Size này đã tồn tại');
            throw new DuplicateError('Size này đã tồn tại');
        }

        // Cập nhật chỉ trường hợp hợp lệ
        const updated = await ProductSize.findByIdAndUpdate(data._id, {
            size: data.size,
        }, { new: true });

        if (!updated) {
            logger.error('Không tìm thấy bản ghi để cập nhật');
            throw new notFoundError('Không tìm thấy bản ghi để cập nhật');
        }

        return {
            data: updated
        };
    }

    static DeleteProductSize = async (id) => {
        return {
            data: await ProductSize.findByIdAndDelete(id)
        };
    }
}

module.exports = ProductSizeService