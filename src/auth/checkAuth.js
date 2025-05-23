'use strict';

const { findById } = require("../services/apiKey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        const objKey = await findById(key);
        if(!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey;
        return next();
    } catch (error) {
        
    }
}

const permission = (permissions) => {
    return (req, res, next) => {
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }

        console.log('req.objKey.permissions', req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permissions);
        if(!validPermission) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        return next();
    }  
}

const asyncHandler = (fn) => {
    return async (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

module.exports = {
    apiKey,
    permission,
    asyncHandler
}