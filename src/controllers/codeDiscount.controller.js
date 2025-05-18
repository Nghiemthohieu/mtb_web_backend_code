'use strict';

const { SuccessResponse } = require("../core/success.reponse");
const CodeDiscountService = require("../services/codeDiscount.service");

class CodeDiscountController {
    static createCodeDiscount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create code discount success',
            data: await CodeDiscountService.createCodeDiscount(req.body)
        }).send(res)
    }

    static updateCodeDiscount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update code discount success',
            data: await CodeDiscountService.updateCodeDiscount(req.body)
        }).send(res)
    }

    static deleteCodeDiscount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete code discount success',
            data: await CodeDiscountService.deleteCodeDiscount(req.params.id)
        }).send(res)
    }

    static getCodeDiscountByID = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get code discount success',
            data: await CodeDiscountService.getCodeDiscountByID(req.params.id)
        }).send(res)
    }

    static getAllCodeDiscount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all code discount success',
            data: await CodeDiscountService.getAllCodeDiscount(req.query)
        }).send(res)
    }

    static getCodeDiscount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get code CodeDiscount success',
            data: await CodeDiscountService.getCodeDiscount(req.body, req.user.userId)
        }).send(res)
    }

    static updateApplicableUsers = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update applicable users success',
            data: await CodeDiscountService.updateApplicableUsers(req.user.userId, req.query.couponId)
        }).send(res)
    }

    static getAllCodeDiscountByDate = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all code discount by date success',
            data: await CodeDiscountService.getAllCodeDiscountByDate(req)
        }).send(res)
    }
}

module.exports = CodeDiscountController