'use strict'

const request = require('request');
const axios = require('axios');

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
  } else if(req.query.control === 'setpoint') {
    //temp
    thermostatSetpoint(req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  } else if(req.query.control === 'schedule') {
    //temp
    thermostatSchedule(req.query.key, (status, messg) => {
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
          let  reply = 'Good Morning.Current indoor temperature is ' + parseInt(resp.message.indoorTemparature,10) + ' ' + resp.message.unit + ' and current outdoor temperature is ' + parseInt(resp.message.outdoorTemperature,10) + ' ' + resp.message.unit;
            return callback(200, reply);
        }
    });
}

const thermostatSetpoint = (key, callback) => {
    let URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/GetHoneywellThermostatSetPointValue?userName=Hackathon&setPointType=';
    
    request.get(URL+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
          let  resp = JSON.parse(body);
            console.log(resp);
          let  reply = 'Thermostat temperature point set to ' + parseInt(resp.message,10) + ' degree celcius';
            return callback(200, reply);
        }
    });
}

const thermostatSchedule = (key, callback) => {
    
    let URLMIN = 'http://52.33.202.95:8080/SPhackathon/svcs/messages/mins';
    let URLHR  = 'http://52.33.202.95:8080/SPhackathon/svcs/messages/hours';
    let URL;

  let arr = key.split(' ');

  let temperature = parseInt(arr[4], 10);
  let timeGiven = parseInt(arr[8], 10);
  
  // json payload
  let data = {
      temp: temperature,
      time: timeGiven
  }
// return if invalid
  if(isNaN(temperature) || isNaN(timeGiven)) {
    return callback(400, 'Invalid command');
  }
  
  // last word of the sentence
  let lastKey = arr[arr.length-1];
  

  if(lastKey === 'minutes' || lastKey === 'minute')
  {
      URL = URLMIN;
  } else if (lastKey === 'hours' || lastKey === 'hour') {
      URL = URLHR;
  } 

  axios.post(URL, data, {
    headers: {'Content-Type': 'application/json'}
  }).then((response) => {
    if(response.status === 200)
    {
      return callback(200, 'Command sent for scheduling');
    
    } else if(response.status !== 200)
    {
      return callback(400, 'Internal service error');
    }
  }).catch((error)=> {
    return callback(400, 'Command Failed');
  });

}