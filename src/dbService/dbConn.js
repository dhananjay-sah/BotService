'use strict';

const Pool = require('pg-pool');
// Simplifies getting the root path in projects with  deep level structures
const appRoot = require('app-root-path');
// Helper module to read from a config file
const readConfig = require('read-config');
const dbConfig = readConfig(`${appRoot}/dbConfig.json`);

const dbParams = {
    user: dbConfig.dbUser,
    password: dbConfig.dbPassword,
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    database: dbConfig.dbDatabase,
    // ssl: dbConfig.dbSSL
};
const connection = new Pool(dbParams);

module.exports.connection = connection;
