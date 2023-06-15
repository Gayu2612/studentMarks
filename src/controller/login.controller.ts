import { validationResult } from 'express-validator';
import { User } from '../models/user.model';
import { hashPassword } from '../helper/Encryption';
import { clientError, errorMessage } from '../helper/ErrorMessage';
import { response } from '../helper/commonResponseHandler';
import * as TokenManager from "../utils/tokenManager";
import { Register } from '../models/register.model';
var activity = 'LOGIN';

/**
 * @author Viveka S
 * @date 16-04-2022 
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is Login
 */

export let loginEmail = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            let { email, password } = req.body;
            email = email.toLowerCase();
            const result = await User.findOne({ email: email }, { userName: 1, email: 1, password: 1, isDeleted: 1, status: 1, otpType: 1, imageUrl: 1, role: 1 })
            const user = await Register.findOne({ email: email }, { userName: 1, email: 1, password: 1, imageUrl: 1, isDeleted: 1, status: 1 })
            if (result) {
                req.body.loginId = result._id
                const newHash = await hashPassword(password);
                if (result["isDeleted"] === true) {
                    return response(req, res, activity, false, 499, {}, clientError.account.deActive);
                } else if (result["status"] === 2) {
                    response(req, res, activity, false, 499, {}, clientError.account.inActive);
                } else if (newHash != result["password"]) {
                    response(req, res, activity, false, 403, {}, "Invalid Password !");
                } else {
                    const token = await TokenManager.CreateJWTToken({
                        userId: result["_id"],
                        userName: result["userName"],
                    });
                    let finalResult = {};
                    finalResult["userDetails"] = result;
                    finalResult["token"] = token;
                    finalResult["loginType"] = 'admin';
                    return response(req, res, activity, true, 200, finalResult, clientError.success.loginSuccess);
                }
            }
            else if (user) {
                req.body.loginId = user._id
                const newHash = await hashPassword(password);
                if (user["isDeleted"] === true) {
                    return response(req, res, activity, false, 499, {}, clientError.account.deActive);
                } else if (user["status"] === 2) {
                    response(req, res, activity, false, 499, {}, clientError.account.inActive);
                } else if (newHash != user["password"]) {
                    response(req, res, activity, false, 403, {}, "Invalid Password !");
                } else {
                    const token = await TokenManager.CreateJWTToken({
                        userId: user["_id"],
                        userName: user["userName"],
                    });
                    let finalResult = {};
                    finalResult["userDetails"] = user;
                    finalResult["token"] = token;
                    finalResult["loginType"] = 'user';
                    return response(req, res, activity, true, 200, finalResult, clientError.success.loginSuccess);
                }
            }
            else {
                response(req, res, activity, false, 422, {}, clientError.email.emailUserNotFound);
            }
        } catch (err: any) {
            console.log('err', err);
            response(req, res, activity, false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
};
