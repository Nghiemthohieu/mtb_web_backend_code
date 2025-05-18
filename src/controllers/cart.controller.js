'use strict';

const { SuccessResponse } = require("../core/success.reponse");
const CartService = require("../services/cart.service");

class CartController {
    static CreateCart = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create cart success',
            data: await CartService.CreateCart(req)
        }).send(res);
    }
    static UpdateCart = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update cart success',
            data: await CartService.updateCart(req)
        }).send(res);
    }
    static getAllCart = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all cart success',
            data: await CartService.getAllCart(req)
        }).send(res);
    }
    static deleteCart = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete cart success',
            data: await CartService.deleteCartItem(req)
        }).send(res);
    }
}

module.exports = CartController;