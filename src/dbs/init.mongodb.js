'use strict'

const mongoose = require('mongoose');
const {db: {mongoName,mongoPass,dbName,cluster}} = require('../config/config.mongdb');
const connectString = `mongodb+srv://${mongoName}:${mongoPass}@${cluster}.nmpse.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${cluster}`;
const {countConnect} = require('../helpers/check.connect');
const logger = require('../utils/logger');

console.log(`connectString: ${connectString}`);
class Database {
    constructor() {
        this.connnect();
    }

    connnect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        mongoose.connect(connectString, {maxPoolSize: 50}).then(_ => {logger.info('Connect MongoDB Success', countConnect())})
        .catch(err => logger.error('Error Connect MongoDB', err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;