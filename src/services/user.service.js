'use strict';

const userService = require("../models/user.model");

const findByAccount = async ({account, select = {
    account:1, password:2, name:1, roles:1, status:1
}})=> {
    return await userService.findOne({account}).select(select).lean();
}

module.exports = {
    findByAccount
}