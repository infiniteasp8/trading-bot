// utils/logger.js

const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance with options for file and console logging
const logger = winston.createLogger({
  level: 'info', // Log level can be changed dynamically
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      format: winston.format.json(),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp(),
        logFormat
      ),
    }),
  ],
});

// Helper functions for different log levels
logger.infoLog = (message) => logger.log('info', message);
logger.errorLog = (message) => logger.log('error', message);
logger.warnLog = (message) => logger.log('warn', message);

module.exports = logger;
