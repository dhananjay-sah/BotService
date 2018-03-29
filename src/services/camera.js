'use strict';

const request = require('request');

module.exports.contorlThermostat = (req, res) => {

    consloe.log(req.query);

if(req.query.control === 'audio') {
    //on /off
    cameraAudio(req.query.camera, req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  } 
  
  if(req.query.control === 'motion') {
    //on /off
    cameraMotion(req.query.camera, req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  }
  if(req.query.control === 'nightmode') {
    //on /off
    cameraNightMode(req.query.camera, req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  }
  if(req.query.control === 'led') {
    //on /off
    cameraLed(req.query.camera, req.query.key, (status, messg) => {
       // return result from thermostat service
        return res.status(status).json({
        message: messg
       });
    });
  }
};

const cameraAudio = (camera, key, callback) => {
  
    let URL ;
    
    if(camera === 'camera1') {
    URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC1AudioDetection?userName=Hackathon&audioDetection=';
    } else if (camera === 'camera2') {
        URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC2AudioDetection?userName=Hackathon&audioDetection=';
    }
    
    request.get(URL+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
            resp = JSON.parse(body);
            console.log(resp);
            return callback(200, resp.message)
        }
    });
}

const cameraMotion = (camera, key, callback) => {
  
    let URL ;
    
    if(camera === 'camera1') {
        URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC1MotionDetection?userName=Hackathon&motionDetection=';
    } else if (camera === 'camera2') {
        URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC2MotionDetection?userName=Hackathon&motionDetection=';
    }
    
    request.get(URL+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
            resp = JSON.parse(body);
            console.log(resp);
            return callback(200, resp.message)
        }
    });
}

const cameraNightMode = (camera, key, callback) => {
  
    let URL ;
    
    if(camera === 'camera1') {
        URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC1NightMode?userName=Hackathon&nightMode=';
    } else if (camera === 'camera2') {
        URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC2NightMode?userName=Hackathon&nightMode=';
    }
    
    request.get(URL+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
            resp = JSON.parse(body);
            console.log(resp);
            return callback(200, resp.message)
        }
    });
}

const cameraLed = (camera, key, callback) => {
  
    let URL ;
    
    if(camera === 'camera1') {
        URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC1LedStatus?userName=Hackathon&ledStatus=';
    } else if (camera === 'camera2') {
        URL = 'http://ec2-34-208-130-135.us-west-2.compute.amazonaws.com:8080/SPConnectedHome/rest/service/changeHoneywellCameraC2LedStatus?userName=Hackathon&ledStatus=';
    }
    
    request.get(URL+key, (error, response, body) => {
     
        if(error) {
            return callback(400, 'Honeywell service connection error');
        } else {
            
            resp = JSON.parse(body);
            console.log(resp);
            return callback(200, resp.message)
        }
    });
}