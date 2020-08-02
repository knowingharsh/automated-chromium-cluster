const Logger = require('./logger');

const custom = new Logger(process.env.LOGGER_LOCATION, process.env.LOGGER_FILE, process.env.LOGGER_LEVEL);

module.exports = function () {
    return {
        customLogger: custom.loggerObject,
    };
}

