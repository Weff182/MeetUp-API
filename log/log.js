const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(format.timestamp(), format.printf((info) => `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`));

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: 'silly' }),
    new transports.File({ filename: './log/app.log', level: 'info' }),
    new transports.File({ filename: './log/error.log', level: 'error' }),
  ],
});
module.exports = logger;
