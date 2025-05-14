'use strict'

const dev = {
    app: {
        port: process.env.DEV_PORT || 8080
    },
    db: {
        mongoName: process.env.MONGO_NAME || '',
        mongoPass: process.env.MONGO_PASS || 27017,
        dbName: process.env.DB_NAME || '',
        cluster: process.env.CLUSTER || ''
    }
}

const pro = {
    app: {
        port: process.env.PRO_PORT || 8080
    },
    db: {
        mongoName: process.env.MONGO_NAME || '',
        mongoPass: process.env.MONGO_PASS || 27017,
        dbName: process.env.DB_NAME || '',
        cluster: process.env.CLUSTER || ''
    }
}

const config = {dev, pro};
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];