'use strict'

const request = require('request');
const axios = require('axios');
module.exports.controlHue = (req, res) => {

    console.log(req.query);

if(req.query.control === 'lights') {
    //on /off
    hueLights(req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  } else if(req.query.control === 'brightness') {
    //on /off
   hueBrightness(req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  } 
};

const hueLights = (key, callback) => {
   
    let URL1 = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/setLight1State?userName=Hackathon&lightState=';
    let URL2 = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/setLight2State?userName=Hackathon&lightState=';

    request.get(URL1+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
            request.get(URL2+key, (error, response, body) => {
     
                if(error) {
                    return callback(400, 'Honeywell service connection error');
                } else {
                    return callback(200, 'All lights state set');
                }
            });
        }
    });
}

const hueBrightness = (key, callback) => {
   
    let URL1 = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/setLight1Brightness?userName=Hackathon';
    let URL2 = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/setLight2Brightness?userName=Hackathon';
    
   let data = {
       bri: key
    };

    axios.post(URL1, data, {
        headers: {'Content-Type': 'application/json'}
      }).then((response)=>{
        if(response.status === 200)
        {
            axios.post(URL2, data, {
                headers: {'Content-Type': 'application/json'}
              }).then((response)=>{
                if(response.status === 200)
                {
                  return callback(200, 'Command Sent');
                }
              }).catch((error)=> {
                return callback(400, 'Command Failed');
              });
        }
      }).catch((error)=> {
        return callback(400, 'Command Failed');
      });
}