'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const log = require(`${appRoot}/src/logger/logger.js`);
const logger = log.logger;
const pService = require('./services/passphrase.js');
const baService = require('./services/billAsk.js');
const bpService = require('./services/billPay.js');
const tService  = require('./services/thermostat.js');
const cService  = require('./services/camera.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
 
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      });
  
    next();
  });
  

// Initiates service for chat bot passphrase verification
app.get('/services/passphrase', (req, res) => {
    console.log('inside verify access');
    pService.verifyAccess(req, res);
});


app.get('/services/askbill', (req, res) => {
    console.log('inside ask bill');
    baService.askBill(req, res);
});

app.get('/services/paybill', (req, res) => {
    bpService.payBill(req, res);
});

app.get('/services/tservice', (req, res) => {
  tService.controlThermostat(req, res);
});

app.get('/services/cservice', (req, res) => {
    cService.controlCamera(req, res);
  });
// Set up server
app.listen(process.env.PORT || 8080, () => {
    logger.debug('chat bot service is up and listening');
    // end of server set up
});
