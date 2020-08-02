const winston = require('winston');
const DailyRotateFile = require("winston-daily-rotate-file");
const moment = require('moment');

module.exports = function (LOGGER_LOCATION, LOGGER_FILE, LOGGER_LEVEL) {
  this.loggerObject = winston.createLogger({
    level: LOGGER_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format((info, options) => {
        info.unixTime = moment().unix();
        return info
      })(),
      winston.format.printf((info) => {
        return `${JSON.stringify(info)}`
      })
    ),
    transports: [
      new DailyRotateFile({
        filename: LOGGER_LOCATION + LOGGER_FILE,
        maxSize: '50m',
        maxFiles: '6d'
      }),
    ],
  });
}
