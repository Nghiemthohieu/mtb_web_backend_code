'use strict';

const logger = require('../utils/logger'); // Winston logger
const onHeaders = require('on-headers');

class RequestLogger {
  static logMiddleware() {
    return (req, res, next) => {
      const startTime = process.hrtime();

      // Tính thời gian xử lý khi response gửi xong header
      onHeaders(res, () => {
        const diff = process.hrtime(startTime);
        const duration = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2); // ms

        logger.info(
            `Request Log | path: ${req.originalUrl} | method: ${req.method} | status: ${res.statusCode} | duration: ${duration} ms`
        );
      });

      next();
    };
  }
}

module.exports = RequestLogger;
