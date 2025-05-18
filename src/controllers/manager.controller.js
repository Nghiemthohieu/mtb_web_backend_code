'use strict';

const { SuccessResponse } = require("../core/success.reponse");
const ManagerService = require("../services/manager.service");

class ManagerController {
    static createManager = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create manager success',
            data: await ManagerService.createManager(req.body)
        }).send(res);
    }
}

module.exports = ManagerController