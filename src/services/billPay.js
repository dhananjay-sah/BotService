'use strict';

const request = require('request');

const payBill = (req, res) => {

    var uid = req.query.UID;
    var dob = req.query.DOB;

    const URL1 = `http://52.33.202.95:8080/ChatBot/service/getUser/${uid}/${dob}`;
    var URL2 = `http://52.33.202.95:8080/ChatBot/service/payamount/${uid}/`;

    const callback2 = (err, resp, bdy) => {
        if (err) {
            return res.status(400).json({
                message: 'Error connecting to master chat bot payment service.'
            });
        }

        if (resp.statusCode === 200) {
            return res.status(200).json({
                message: 'You have successfully made your payment.'
            });
        }

        return res.status(400).json({
            message: 'There was a problem while making your payment, please try again later.'
        });
        // end of callback 2
    };

    const callback = (error, response, body) => {
        if (error) {
            return res.status(400).json({
                message: 'Error connecting to master chat bot service'
            });
        }

        let respStr = JSON.parse(body);
        respStr = JSON.parse(respStr.substring(1, respStr.length - 1));

        let outstanding = parseInt(respStr.ZCHATBOT_GET_ACCOUNTDETAILS.EV_OUTSTANDING, 10);

        if (outstanding > 0) {
            outstanding *= -1;
            // console.log(outstanding);
            URL2 += outstanding;
            request.get(URL2, callback2);
        } else {
            return res.status(200).json({
                message: 'You currently do not have any outstanding bill payments, as you have already paid your bill.'
            });
        }
        // end of callback 1
    };

    request.get(URL1, callback);

};
module.exports.payBill = payBill;
