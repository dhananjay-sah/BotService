'use strict';

const dbConn = require('./dbConn');
const appRoot = require('app-root-path');
const log = require(`${appRoot}/src/logger/logger.js`);
const logger = log.logger;
const connection = dbConn.connection;


// get user data

const getUserData = (passphrase, fname, callback) => {
    var arrResp = [];
    connection.connect().then(client => {
        client.query('Select user_id as uid, user_fname as uname , user_bday as bday from chatbotsch.user_data where user_passkey = $1 AND user_fname = $2', [passphrase, fname]).then(res => {
                if (res.rows.length) {
                    logger.debug('db res = ', res.rows[0]);
                    arrResp[0] = res.rows[0].uid;
                    arrResp[1] = res.rows[0].uname;
                    arrResp[2] = res.rows[0].bday;
                    client.release();
                }
                return callback(arrResp);
            })
            .catch(e => {
                // insert log error
                logger.error('query error in getUserData function', e.message, e.stack);
            });
    });
};

module.exports.getUserData = getUserData;
