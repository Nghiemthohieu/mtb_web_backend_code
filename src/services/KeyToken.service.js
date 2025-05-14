'use strict'

const keytokenModel = require("../models/keytoken.model");
const { Types } = require('mongoose');
const logger = require("../utils/logger");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken}) => {
        try{
            // const tokens= await keytokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })

            // return tokens ? tokens.publicKey : null

            const tokens = await keytokenModel.findOneAndUpdate(
                {user: userId},
                {publicKey, privateKey, refreshTokenUsed: [], refreshToken},
                {upsert: true, new: true}
            )
            return tokens ? tokens.publicKey : null
        } catch(err) {
            logger.error(err);
            throw err;
        }
    }

    
    static findByUserId = async (userId) => {
        if (typeof userId !== 'string' || !Types.ObjectId.isValid(userId)) {
            logger.error('Invalid userId format');
            throw new Error('Invalid userId format');
        }

        return await keytokenModel.findOne({ user: new Types.ObjectId(userId) }).lean();
    }

    static removeKeyById = async (id) => {
        return await keytokenModel.deleteOne({_id: id});
    }

    static findbyRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({refreshTokenUsed: refreshToken}).lean();
    }

    static findbyRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({refreshToken});
    }

    static deleteKeyById = async (userId) => {
        return await keytokenModel.delete({user: userId});
    }
}

module.exports = KeyTokenService;