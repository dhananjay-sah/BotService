'use strict'

const request = require('request');

module.exports.controlThermostat = (req, res) => {

    console.log(req.query);

if(req.query.control === 'switch') {
    //on /off
    switchThermostat(req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  } else if(req.query.control === 'fan') {
   //fan 
    thermostatFan(req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  } else if(req.query.control === 'temp') {
    //temp
    thermostatTemp((status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  }
};

const switchThermostat = (key, callback) => {
    let URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellThermostatSystemMode?userName=Hackathon&systemMode=';
    
    request.get(URL+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
          let  resp = JSON.parse(body);
            console.log(resp);
            return callback(200, resp.message)
        }
    });
}

const thermostatFan = (key, callback) => {
    let URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellThermostatFanMode?userName=Hackathon&fanMode=';
    
    request.get(URL+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
          let  resp = JSON.parse(body);
            console.log(resp);
            return callback(200, resp.message)
        }
    });
}

const thermostatTemp = (callback) => {
    let URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/GetHoneywellThermostatTemperature?userName=Hackathon';
    
    request.get(URL, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
          let  resp = JSON.parse(body);
            console.log(resp);
          let  reply = 'Current indoor temperature is ' + resp.message.indoorTemparature + ' ' + resp.message.unit + ' and current outdoor temperature is ' + resp.message.outdoorTemperature + ' ' + resp.message.unit;
            return callback(200, reply);
        }
    });
}