var ObjectId = require('mongodb').ObjectID;
import { saveLog } from '../controller/logs.controller';
import { Logs, LogsDocument } from '../models/logs.model';
var nodemailer = require ('nodemailer');

/**
 * @param res {Function} Response 
 * @param success {Boolean} Http Status Code for the response
 * @param result {Object/Array} Result for the Response
 * @param message {string} Primary message for the response
 * @param extendedMessage {Object} Detailed Message for the error Message
 * @function commonResponse {Function} Used for Handling the Common Response
 */ 

export let response = function (req,res,activity, success, statusCode, result, message, extendedMessage?) {
    const LogsData: LogsDocument = new Logs();
    let date = new Date()
    LogsData.activity = activity;
    var trusted_proxies = ['177.144.11.100', '177.144.11.101'];  
    if (req.body.loginType == 'employee') {
        LogsData.employee = (req.body.loginId)? req.body.loginId : '';
    } else if(req.body.loginType == 'client') {
        LogsData.client = (req.body.loginId)? req.body.loginId : '';
    } else {
        LogsData.user = (req.body.loginId)? req.body.loginId : '';
    }
    LogsData.company = (req.body.company)? req.body.company : '';
    LogsData.url = req.baseUrl;
    LogsData.time = date.getTime();
    LogsData.date = date; 
    LogsData.reqData = req;
    LogsData.resData = result;
    LogsData.description = message;
    LogsData.processStatus = (statusCode === 200)? true: false;
    saveLog(LogsData);
    res.status(statusCode);
    return res.json({
        success: success, 
        result: result || '',
        message: message || '',
        extendedMessage: extendedMessage || '',
        statusCode: statusCode
    });
}



// export const sendEmail = async (toMail, subject, text) => {
//     var sender = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         secure: true,
//         port: 465,
//         auth: {
//             user: 'murugans1510@gmail.com',
//             pass: 'epjdegpqjgkwpgdw'
//         }
//     });

//     var composemail = { 
//         from: 'murugans1510@gmail.com',
//         to: "sviveka306@gmail.com",
//         subject: 'send mail using nodejs',
//         texT: 'Hello world'
//     }

//     await sender.sendMail(composemail, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Mail send successfully' + info.response)
//         }
//     })
// }
