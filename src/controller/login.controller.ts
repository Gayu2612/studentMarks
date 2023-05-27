import { validationResult } from 'express-validator';
import { User } from '../models/user.model';
import {hashPassword} from '../helper/Encryption';
import { clientError } from 'src/helper/ErrorMessage';
import { response } from '../helper/commonResponseHandler';
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
            const result = await User.findOne({ email: email }, { userName: 1, email: 1, password: 1, isDeleted: 1, status: 1, imageUrl: 1, role: 1 })
            if (result) {
                const newHash = await hashPassword(password);
                if(result["isDeleted"]===true){
                    return response(req,res,activity,false,499,{},clientError.account.deActive)
                }
            } else {

            }
        } catch {

        }
    }
}
