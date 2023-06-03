import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Register, RegisterDocument } from "../models/register.model";
import { hashPassword } from "../helper/Encryption";

var activity = 'register';


/**
 * @author bharath M
 * @date 17-09-2022
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @description this function is used for create User
*/


export const saveUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {

            const password = req.body.password;
            const newHash = await hashPassword(password);
            req.body.password = newHash
            const UserDetails: RegisterDocument = req.body;
            const createUser = new Register(UserDetails);
            const data = await createUser.save();
            response(req, res, activity, true, 200, data, clientError.success.savedSuccessfully);
        } catch (err: any) {
            response(req, res, activity, false, 500, {}, errorMessage.internalServer, err.message)
        }
    } else {
        response(req, res, activity, false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()))
    }
};