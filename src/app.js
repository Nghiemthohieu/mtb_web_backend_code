require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./dbs/init.mongodb');
const awsService = require('./dbs/init.awss3');
awsService.init(); // Gọi init để khởi tạo S3 Client

// const {checkOverload} = require('./helpers/check.connect');
// checkOverload()
const RequestLogger = require('./middlewares/logger.middeware');
app.use(RequestLogger.logMiddleware());

app.use('', require('./routers'));

app.use((req, res, next)=> {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json({
        status: 'error',
        code: status,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;