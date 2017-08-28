'use strict';

// require winston library for log generation
const winston = require('winston');
// required for file creation
const fs = require('fs');
const appRoot = require('app-root-path');
var LogRotator = require('winston-daily-rotate-file');
// change in environment will cause a change in the type of log reports
const env = 'development';
// default log directory
const logDir = `${appRoot}/Logs`;
// Create the log directory if it does not exist
if (fs.existsSync(logDir) === false) {
    fs.mkdirSync(logDir);
}
// create a timestamp to be used in the log reports
const timeStampFormat = () => (new Date()).toLocaleTimeString();
// create a winston logger object
const logger = new winston.Logger({
    transports: [
        // Console output (optional)
        new winston.transports.Console({
            timestamp: timeStampFormat,
            colorize: true,
            level: 'debug'
        }),
        // file output
        // create a new LogRotator object
        new LogRotator({
            filename: `${logDir}/-results.log`,
            timestamp: timeStampFormat,
            // date prepended to each log file
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: env === 'development' ?
                'debug' :
                'error'
        })
    ]
});

// Exports
module.exports.logger = logger;
