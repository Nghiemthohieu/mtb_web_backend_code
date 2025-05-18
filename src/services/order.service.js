'use strict';

const { BadRequestError } = require("../core/error.response");
const orderModel = require("../models/order.model");
const { updateCodeDiscount } = require("./codeDiscount.service");

class OrderServce {
    static createOrder = async (req) => {
        const { codeDiscount, order } = req.body;

        if (req.user?.userId) {
            order.user = req.user.userId;

            // Nếu có mã giảm giá thì cập nhật lượt dùng
            if (codeDiscount) {
                await updateCodeDiscount(req.user.userId, codeDiscount);
            }
        } else if (codeDiscount) {
            // Trường hợp có mã giảm giá nhưng chưa đăng nhập
            throw new BadRequestError("Vui lòng đăng nhập để sử dụng mã giảm giá");
        }

        const createdOrder = await orderModel.create(order);

        return { data: createdOrder };
    }
    static getAllOrder = async (query) => {
        return await paginate(orderModel, {}, { page: query.page, limit: query.limit });
    }
    static updateOrderStatus = async (req) => {
        const { status, orderId } = req.body;

        // Các trạng thái hợp lệ
        const statusOptions = {
            completed: 'completed',
            cancelled: 'cancelled',
            pending: 'pending'
        };

        // Kiểm tra trạng thái có hợp lệ không
        if (!Object.values(statusOptions).includes(status)) {
            logger.error(`Invalid status: ${status}`);
            throw new Error('Invalid status value');
        }

        // Tìm đơn hàng
        const order = await orderModel.findById(orderId);
        if (!order) {
            logger.error('Order not found');
            throw new notFoundError('Order not found');
        }

        // Cập nhật trạng thái
        order.status = status;

        // Lưu thay đổi vào DB
        const updatedOrder = await order.save();

        // Trả về đơn hàng đã cập nhật
        return { data: updatedOrder };
    };
    static deleteOrder = async (id) => {
        return { data: await orderModel.findByIdAndDelete(id) };
    }
    static getOrderById = async (id) => {
        return { data: await orderModel.findById(id) };
    }
    static getOrderByUserId = async (userId) => {
        return { data: await orderModel.find({ userId }) };
    }
}

module.exports = {
    OrderServce
}