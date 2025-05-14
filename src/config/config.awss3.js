'use strict';

const dev = {
    aws: {
        bucketName: process.env.AWSS3_BUTKET_NAME || '',
        accessKeyId: process.env.AWSS3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWSS3_SECRET_ACCESS_KEY || '',
        region: process.env.AWSS3_REGION || ''
    }
}

const config = {dev};
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];