'use strict';

const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const KeyTokenService = require('../services/KeyToken.service');
const { authFailureError, notFoundError, ErrorResponse } = require('../core/error.response');
const { log } = require('winston');
const logger = require('../utils/logger');

// Cải thiện HEADER
const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
};

// Tạo Token pair (access và refresh token)
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, publicKey, {
            expiresIn: '2 days' // access token có hiệu lực 2 ngày
        });

        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: '7 days' // refresh token có hiệu lực 7 ngày
        });

        // Kiểm tra và xác minh access token
        JWT.verify(accessToken, publicKey, (err, decoded) => {
            if (err) {
                logger.error('Error verifying access token:', err);
            } else {
                logger.info('Decoded access token:', decoded);
            }
        });

        return {
            accessToken,
            refreshToken
        };
    } catch (error) {
        logger.error("Error creating token pair:", error);
        throw new ErrorResponse("Token generation failed", 500);
    }
};

// Middleware xác thực
const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    
    if (!userId) {
        logger.error('Authentication Failure');
        throw new authFailureError('Authentication Failure');
    }

    const keyToken = await KeyTokenService.findByUserId(userId);
    
    if (!keyToken) {
        logger.error('Not found keyToken');
        throw new notFoundError('Not found keyToken');
    }

    const authHeader = req.headers[HEADER.AUTHORIZATION];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.error('Authentication Failure');
        throw new authFailureError('Authentication Failure');
    }

    const accessToken = authHeader.split(' ')[1];
    try {
        const decoded = JWT.verify(accessToken, keyToken.publicKey);
        
        if (userId !== decoded.userId) {
            logger.error('Invalid UserId');
            throw new authFailureError('Invalid UserId');
        }

        req.keyStore = keyToken;
        req.user = decoded;  // Optional: Attach user data to request for further use
        next();
    } catch (error) {
        logger.error('Invalid access token');
        throw new authFailureError('Invalid access token');
    }
});

// Hàm verify JWT với keySecret
const verifyJWT = async (token, keySecret) => {
    try {
        return JWT.verify(token, keySecret);
    } catch (error) {
        logger.error('JWT verification failed');
        throw new ErrorResponse('JWT verification failed', 500);
    }
};

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
};
