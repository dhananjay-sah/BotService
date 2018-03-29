'use strict';

const appRoot = require('app-root-path');
const typeOf = require('typeof');
const log = require(`${appRoot}/src/logger/logger.js`);
const logger = log.logger;
const dbService = require(`${appRoot}/src/dbService/dbOps.js`);

const verifyAccess = (req, res) => {
    var passKey = req.query.passKey;
    if (typeOf(passKey) !== 'undefined' || passKey !== '') {
        // callback for receiving response from dbService
        const callback = (respArr) => {
            logger.debug(respArr.length);
            if (respArr.length === 0) {
                logger.debug('Sorry , you do not have access rights to use the billing service');
                return res.status(400).json({
                    message: 'Sorry , you do not have access rights to use the billing service',
                    access: 'not granted'
                });
            }
            logger.debug(`Welcome ${respArr[1]} , you now have access to your billing services. What would you like to do ?`);
            return res.status(200).json({
                message: `Welcome ${respArr[1]} , you now have access to your billing services. What would you like to do ?`,
                uid: respArr[0],
                dob: `${respArr[2]}`,
                access: 'granted'
            });
        };
        // check if user exists and return corresponding data
        dbService.getUserData(passKey, callback);
    } else {
        return res.status(400).json({
            message: 'Sorry , passphrase not provided',
            access: 'not granted'
        });
    }
};

module.exports.verifyAccess = verifyAccess;
