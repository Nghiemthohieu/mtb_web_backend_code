const { createLogger, format, transports } = require('winston');
const path = require('path');

const vietnamTimestamp = () => {
  const date = new Date();
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const localeTime = date.toLocaleString('en-GB', options); // "14/05/2025, 01:50:34"
  const [day, month, yearAndTime] = localeTime.split('/');
  const [year, time] = yearAndTime.split(', ');
  return `${year}-${month}-${day} ${time}`; // "2025-05-14 01:50:34"
};

class LoggerService {
    constructor() {
        this.logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({ format: vietnamTimestamp }),
            format.errors({ stack: true }),
            format.printf(({ timestamp, level, message, stack }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
            })
        ),
        transports: [
            new transports.Console(),
            new transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            }),
            new transports.File({
            filename: path.join(__dirname, '../logs/combined.log'),
            }),
        ],
        });

        // Ghi log ra console nếu không phải production
        if (process.env.NODE_ENV !== 'production') {
        this.logger.add(
            new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
            })
        );
        }
    }

    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }

    debug(message) {
        this.logger.debug(message);
    }
}

module.exports = new LoggerService();
