'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const log = require(`${appRoot}/src/logger/logger.js`);
const logger = log.logger;
const pService = require('./services/passphrase.js');
const baService = require('./services/billAsk.js');
const bpService = require('./services/billPay.js');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Initiates service for chat bot passphrase verification
app.get('/services/passphrase', (req, res) => {
    pService.verifyAccess(req, res);
});

app.get('/services/askbill', (req, res) => {
    baService.askBill(req, res);
});

app.get('/services/paybill', (req, res) => {
    bpService.payBill(req, res);
});

// Set up server
app.listen(process.env.PORT || 8000, () => {
    logger.debug('chat bot service is up and listening');
    // end of server set up
});
