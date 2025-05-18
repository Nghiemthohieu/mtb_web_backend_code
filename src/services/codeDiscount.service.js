'use strict';

const { notFoundError } = require("../core/error.response");
const codeDiscountModel = require("../models/codeDiscount.model");
const logger = require("../utils/logger");
const paginate = require("../utils/paginate");

class CodeDiscountService {
    static createCodeDiscount = (data) => {
        return codeDiscountModel.create(data);
    }

    static updateCodeDiscount = async (data) => {
        return codeDiscountModel.findByIdAndUpdate(data._id, data, { new: true });
    }

    static deleteCodeDiscount = async (id) => {
        return codeDiscountModel.findByIdAndDelete(id);
    }

    static getCodeDiscountByID = async (id) => {
        return codeDiscountModel.findById(id);
    }

    static getAllCodeDiscount = async (query) => {
        return await paginate(codeDiscountModel, {}, { page: query.page, limit: query.limit });
    }

    static getCodeDiscount = async (query, userId) => {
        const { code, ordertotal } = query;

        // Nếu userId undefined thì báo lỗi ngay
        if (!userId) {
            logger.warn('Người dùng chưa đăng nhập');
            throw new Error('Vui lòng đăng nhập để áp mã giảm giá');
        }

        const codeDiscount = await codeDiscountModel.findOne({ code });

        if (!codeDiscount) {
            logger.warn('Mã code không tồn tại');
            throw new notFoundError('Mã code không tồn tại');
        }

        const now = new Date();
        if (now < codeDiscount.start_date || now > codeDiscount.end_date) {
            logger.warn('Mã chưa được kích hoạt hoặc đã hết hạn');
            throw new notFoundError('Mã chưa được kích hoạt hoặc đã hết hạn');
        }

        if (
            Array.isArray(codeDiscount.applicable_users) &&
            codeDiscount.applicable_users.length > 0 &&
            !codeDiscount.applicable_users.some(user => user.equals(userId))
        ) {
            logger.warn('Mã không áp dụng cho người dùng này');
            throw new notFoundError('Mã không áp dụng cho bạn');
        }

        if (ordertotal < codeDiscount.min_order_value) {
            logger.warn('Tổng tiền không đủ để áp dụng mã');
            throw new notFoundError('Tổng tiền không đủ để áp dụng mã');
        }

        if (
            codeDiscount.quantity !== undefined &&
            codeDiscount.used_count >= codeDiscount.quantity
        ) {
            logger.warn('Mã đã hết lượt sử dụng');
            throw new notFoundError('Mã đã hết lượt sử dụng');
        }

        return codeDiscount;
    };

    static updateApplicableUsers = async (userId, couponId) => {
        return codeDiscountModel.updateOne(
            { _id: couponId },
            { $addToSet: { applicable_users: userId } } // đảm bảo không trùng
        );
    }

    static getAllCodeDiscountByDate = async (req) => {
        const now = new Date();
        const query = {
            start_date: { $lte: now },
            end_date: { $gte: now }
        };

        // Nếu req.user và req.user.userId tồn tại thì thêm điều kiện lọc user chưa dùng mã
        if (req.user && req.user.userId) {
            query.applicable_users = { $ne: req.user.userId };
        }

        return await codeDiscountModel.find(query);
    }
}

module.exports = CodeDiscountService