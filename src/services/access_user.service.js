'use strict';

const access_userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./KeyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getIntoData } = require("../utils")
const { BadRequestError, conflictRequestError, ForbiddenError, authFailureError } = require("../core/error.response");

const { findByAccount } = require("./user.service");
const logger = require("../utils/logger");
const CartService = require("./cart.service");
class AccessUserService {

    static handlerRefreshToken = async (refreshToken) => {
        const foundToken = await KeyTokenService.findbyRefreshTokenUsed(refreshToken);
        if (foundToken) {
            const { userId, account } = await verifyJWT(refreshToken, foundToken.privateKey);
            await KeyTokenService.deleteKeyById(userId);
            logger.error('Something wrng happend !! Pls relogin');
            throw new ForbiddenError('Something wrng happend !! Pls relogin');
        }

        const holderToken = await KeyTokenService.findbyRefreshToken(refreshToken);
        if (!holderToken) {
            logger.error('user not registeted');
            throw new authFailureError('user not registeted');
        }
        const { userId, account } = await verifyJWT(refreshToken, holderToken.privateKey);
        const foundUser = await findByAccount({ account });
        if (!foundUser) {
            logger.error('user not registeted');
            throw new authFailureError('user not registeted');
        }
        const tokens = await createTokenPair({
            userId,
            account
        }, holderToken.publicKey, holderToken.privateKey)

        await holderToken.updateOne({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokenUsed: refreshToken
            }
        })

        return {
            data: {
                user: { userId, account },
                tokens
            }
        }
    }

    static logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore._id);
        return {
            data: delKey
        }
    }

    static login = async (req) => {
        const { account, password} = req.body;
        const FoundUser = await findByAccount({ account });
        if (!FoundUser) {
            logger.error('Account khong ton tai');
            throw new BadRequestError('Account khong ton tai')
        }
        const isMatch = await bcrypt.compare(password, FoundUser.password);
        if (!isMatch) {
            logger.error('Mat khau khong dung');
            throw new BadRequestError('Mat khau khong dung')
        }

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        const { _id: userId } = FoundUser;
        const tokens = await createTokenPair({
            userId,
            account
        }, publicKey, privateKey)
        await KeyTokenService.createKeyToken({
            userId,
            refreshToken: tokens.refreshToken,
            privateKey, publicKey,
        });

        const sessionId = req.cookies.session_id;
        if (sessionId) {
            await CartService.mergeGuestCartToUser(userId, sessionId);
        }

        return {
            data: {
                user: getIntoData({ fields: ['_id', 'name', 'account'], object: FoundUser }),
                tokens
            }
        }
    }

    static signUp = async ({ name, account, password }) => {
        try {
            //kiểm tra account là email hay sdt
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account);
            const isPhone = /^0\d{9,10}$/.test(account);

            if (!isEmail && !isPhone) {
                logger.error('Account không chính xác!');
                throw new BadRequestError('Account không chính xác!')
            }
            //kiểm tra xem account có tồn tại hay không
            const user = await access_userModel.findOne({ account: account }).lean();
            if (user) {
                logger.error('Account đã được đăng ký!');
                throw new BadRequestError('Account đã được đăng ký!')
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = await access_userModel.create({
                name,
                account: account,
                password: passwordHash,
                roles: ['user']
            })

            if (newUser) {
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
                    logger.error('KeyStore Error!');
                    throw new BadRequestError('KeyStore Error!')
                }

                const tokens = await createTokenPair({
                    userId: newUser._id,
                    account
                }, publicKey, privateKey)

                return {
                    code: 201,
                    data: {
                        user: getIntoData({ fileds: ['_id', 'name', 'account'], object: newUser }),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadate: null
            }

        } catch (err) {
            return {
                code: 'xxx',
                message: err.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessUserService;