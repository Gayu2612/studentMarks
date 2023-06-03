

import * as jwt from 'jsonwebtoken';
import { response } from '../helper/commonResponseHandler';
import { clientError, errorMessage } from '../helper/ErrorMessage';
const activity = 'token';

/**
 * @author Viveka S
 * @date 26-07-2022
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to token creation
 */

export let CreateJWTToken = (data: any = {}) => {
    let tokenData = {};
    if (data && data['userName']) {
        tokenData['userName'] = data['userName']
    }
    if (data && data['userId']) {
        tokenData['userId'] = data['userId']
    }
    if (data && data['loginType']) {
        tokenData['loginType'] = data['loginType']
    }
    const token = jwt.sign(tokenData, 'techSpot123', { expiresIn: '8h' });
    return token;
}



/**
 * @author Viveka S
 * @date 26-07-2022
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to Chech the session and Verify the token
 */
export let checkSession = async (req, res, next) => {
    const token = req.headers['token'];
    console.log('token', token);

    if (token) {
        const headerType = token.split(' ')[0];
        const tokenValue = token.split(' ')[1].trim();
        if (headerType.trim() === "Bearer") {
            try {
                jwt.verify(tokenValue, 'techSpot123', function (err, tokendata) {
                    if (err) {
                        return res.status(400).json({ message: clientError.token.sessionExpire })
                    }
                    if (tokendata) {
                        req.body.loginId = tokendata.userId;
                        console.log(' req.body.loginIddd', req.body.loginId);
                        req.body.loginType = tokendata.loginType;
                        req.body.user = tokendata.userName;
                        req.body.createdBy = tokendata.userName;
                        req.body.createdOn = new Date();
                        req.body.modifiedBy = tokendata.userName;
                        req.body.modifiedOn = new Date();
                        next();
                    }
                    console.log('tokendataaaa', tokendata);
                });
            } catch (err: any) {
                return response(req, res, activity, false, 499, {}, clientError.token.unauthRoute, err.message);
            }
        }
    } else {
        return response(req, res, activity, false, 499, {}, clientError.token.unauthRoute);
    }
}