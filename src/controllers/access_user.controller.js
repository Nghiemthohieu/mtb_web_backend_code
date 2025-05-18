'use strict';
const AccessUserService = require("../services/access_user.service");

const { OK, CREATE, SuccessResponse } = require("../core/success.reponse");

class AccessUserController {
    static handlerRefreshToken = async (req, res, next) => {
        console.log("body::", req.body);
        console.log("refreshToken::", req.body.refreshToken);
        new SuccessResponse({
            message: 'Get token success',
            data: await AccessUserService.handlerRefreshToken(req.body.refreshToken)
        }).send(res);
    }

    static logout = async (req, res, next) => {
        try {
            new SuccessResponse({
                message: 'Logout success',
                data: await AccessUserService.logout(req.keyStore)
            }).send(res);
        } catch (error) {
            next(new ErrorResponse('Logout failed', 500)); // Hoặc có thể trả về lỗi chi tiết hơn
        }
    }

    static login = async (req, res, next) => {
        try {
            const data = await AccessUserService.login(req);
            if (req.cookies.session_id) {
                res.clearCookie('session_id');
            }
            new SuccessResponse({
                message: 'Login success',
                data
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
    static signUp = async (req, res, next) => {
        new CREATE({
            message: 'Create success',
            data: await AccessUserService.signUp(req.body)
        }).send(res);
    }
}

module.exports = AccessUserController;