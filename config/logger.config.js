
const { format, createLogger, transports} = require('winston');
const {timestamp, combine} = format;
const logFormat = format.printf(({level, message, timestamp}) => {
return `${timestamp} ${level}: ${message}`;
});
const logger = createLogger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}), logFormat),
    transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({ filename: 'onliner-catalog-test.log', level: 'debug'})
    ],
  });
module.exports = logger;