'use strict';
const AccessUserService = require("../services/access_user.service");

const {OK, CREATE,  SuccessResponse} = require("../core/success.reponse");

class AccessUserController {
    handlerRefreshToken = async (req, res, next) => {
        console.log("body::",req.body); 
        console.log("refreshToken::",req.body.refreshToken);
        new SuccessResponse({
            message: 'Get token success',
            data: await AccessUserService.handlerRefreshToken(req.body.refreshToken)
        }).send(res);
    }

    logout = async (req, res, next) => {
        try {
            new SuccessResponse({
            message: 'Logout success',
            data: await AccessUserService.logout(req.keyStore)
        }).send(res);
        } catch (error) {
            next(new ErrorResponse('Logout failed', 500)); // Hoặc có thể trả về lỗi chi tiết hơn
        }
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            message: 'Login success',
            data: await AccessUserService.login(req.body)
        }).send(res);
    }
    signUp = async (req,res, next) => {
        new CREATE({
            message: 'Create success',
            data: await AccessUserService.signUp(req.body)
        }).send(res);
    }
}

module.exports = new AccessUserController();