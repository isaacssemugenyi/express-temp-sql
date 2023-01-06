const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
require('dotenv').config();

const logConfiguration = {
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      level: 'info',
      filename: 'logs/info-rotate-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log',
    }),
    new transports.File({
      level: 'warn',
      filename: 'logs/warn.log',
    }),
  ],
  format: format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
};

const logger = createLogger(logConfiguration);

module.exports = logger;
