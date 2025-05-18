'use strict';

const { SuccessResponse } = require("../core/success.reponse");
const { OrderServce } = require("../services/order.service");

class OrderController {
    static createOrder = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create order success',
            data: await OrderServce.createOrder(req)
        }).send(res)
    }

    static getAllOrder = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all order success',
            data: await OrderServce.getAllOrder(req.query)
        }).send(res)
    }

    static updateOrderStatus = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update order status success',
            data: await OrderServce.updateOrderStatus(req)
        }).send(res)
    }

    static deleteOrder = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete order success',
            data: await OrderServce.deleteOrder(req.params.id)
        }).send(res)
    }

    static getOrderById = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get order success',
            data: await OrderServce.getOrderById(req.params.id)
        }).send(res)
    }

    static getOrderUserId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get order detail success',
            data: await OrderServce.getOrderUserId(req.user.userId)
        }).send(res)
    }
}

module.exports = OrderController;