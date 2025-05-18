'use strict';

const managerModel = require("../models/manager.model");
const bcrypt = require("bcrypt");
const { BadRequestError, conflictRequestError, ForbiddenError, authFailureError } = require("../core/error.response");
const logger = require("../utils/logger");

class ManagerService {

    static getManagerByAccount = async (account) => {
        return managerModel.findOne({ account: account });
    }

    static createManager = async (data) => {
        const user = await this.getManagerByAccount(data.account);
        console.log(user);
        if (user) {
            logger.error('account đã tồn tại!!');
            throw new BadRequestError('account đã tồn tại!!');
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const newManager = await managerModel.create({
            name: data.name,
            account: data.account,
            password: passwordHash,
            roles: data.roles
        });
        return {
            data: newManager
        }
    }
}

module.exports = ManagerService