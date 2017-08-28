'use strict';

const request = require('request');

const askBill = (req, res) => {

    var uid = req.query.UID;
    var dob = req.query.DOB;

    const URL = `http://52.33.202.95:8080/ChatBot/service/getUser/${uid}/${dob}`;

    const callback = (error, response, body) => {

        if (error) {
            return res.status(400).json({
                message: 'Error connecting to master chat bot service'
            });
        }

        let respStr = JSON.parse(body);
        respStr = JSON.parse(respStr.substring(1, respStr.length - 1));
        // extract user details
        const houseNo = respStr.ZCHATBOT_GET_ACCOUNTDETAILS.IT_ADDRESS.item[0].HOUSENO;
        const city = respStr.ZCHATBOT_GET_ACCOUNTDETAILS.IT_ADDRESS.item[0].CITY;
        const street = respStr.ZCHATBOT_GET_ACCOUNTDETAILS.IT_ADDRESS.item[0].STREET;
        const postCode = respStr.ZCHATBOT_GET_ACCOUNTDETAILS.IT_ADDRESS.item[0].POSTCODE;
        const currency = respStr.ZCHATBOT_GET_ACCOUNTDETAILS.IT_BILL.item[0].CURRENCY;
        const bill = parseInt(respStr.ZCHATBOT_GET_ACCOUNTDETAILS.IT_BILL.item[0].TOTALAMOUNT.trim(), 10);
        const lPayment = parseInt(respStr.ZCHATBOT_GET_ACCOUNTDETAILS.IT_PAYMENTS.item[0].PAYMENT, 10);
        const outstanding = parseInt(respStr.ZCHATBOT_GET_ACCOUNTDETAILS.EV_OUTSTANDING, 10);
        let msg = '';

        if (outstanding > 0) {
            msg = `Your current outstanding bill amount is ${outstanding} ${currency}. Would you like to pay your bill ?`;
        } else {
            msg = 'You currently do not have any outstanding bill payments, as you have already paid your bill.';
        }

        return res.status(200).json({
            message: `Your current residential address is ${houseNo} ${street}, ${city} ${postCode}. Your current bill amount is ${bill} ${currency} and your latest payment for this bill was ${lPayment} ${currency}. ${msg}`
        });
    };

    request.get(URL, callback);
};
module.exports.askBill = askBill;
