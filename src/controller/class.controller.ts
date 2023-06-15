import { validationResult } from "express-validator"
import * as async from 'async';
import { response } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { Mark, MarkDocument } from "../models/mark.model";
import { Section, SectionDocument } from "../models/section.model";
import { Class, ClassDocument } from "../models/class.model";

var activity = 'StudentMarks';

/**
 * @author Viveka S
 * @date 16-07-2022
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Student
 */


export const saveClass = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const ClassDetails: ClassDocument = req.body;
            ClassDetails.sectionName = ClassDetails.sectionName?.toLowerCase()
            const data = await Section.findOne({ $and: [{ sectionName: ClassDetails.sectionName }, { isDeleted: false }] });
            if (!data) {
                const createClassDetails = new Class(ClassDetails);
                const data = await createClassDetails.save();
                response(req, res, activity, true, 200, data, clientError.success.savedSuccessfully);
            } else {
                response(req, res, activity, false, 422, {}, clientError.success.exist);
            }
        } catch (err: any) {
            response(req, res, activity, false, 500, {}, errorMessage.internalServer, err.message)
        }
    } else {
        response(req, res, activity, false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()))
    }
};

export let getAllClass = async (req, res, next) => {
    try {
        const data = await Class.find({ isDeleted: false });
        console.log('dattaaaa',data);
        
        response(req, res, activity, true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, false, 500, {}, errorMessage.internalServer, err.message);
    }
};

export let updateClass = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const ClassDetails: ClassDocument = req.body;
            ClassDetails.sectionName = ClassDetails.sectionName.toLowerCase()
            const data = await Section.findOne({ $and: [{ _id: { $ne: ClassDetails._id } }, { sectioName: ClassDetails.sectionName }, { isDeleted: false }] })

            if (!data) {
                const updateClass = new Class(ClassDetails)
                let insertStudent = await updateClass.updateOne({
                    $set: {
                        sectionName: ClassDetails.sectionName,
                        modifiedOn: ClassDetails.modifiedOn,
                        modifiedBy: ClassDetails.modifiedBy
                    }
                });
                response(req, res, activity, true, 200, insertStudent, clientError.success.updateSuccess)
            } else {
                response(req, res, activity, false, 422, {}, clientError.success.exist);
            }
        } catch (err: any) {
            response(req, res, activity, false, 500, {}, errorMessage.internalServer, err.message)
        }
    } else {
        response(req, res, activity, false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};



export let deleteClass = async (req, res, next) => {
    try {
        let { modifiedOn, modifiedBy } = req.body;
        let id = req.query._id;
        const data = await Class.findByIdAndUpdate({ _id: id }, {
            $set: {
                isDeleted: true,
                modifiedOn: modifiedOn,
                modifiedBy: modifiedBy,
            }
        })
        response(req, res, activity, true, 200, data, clientError.success.deleteSuccess)
    }
    catch (err: any) {
        response(req, res, activity, true, 500, {}, errorMessage.internalServer, err.message)
    }
};



export let getSingleSection = async (req, res, next) => {
    try {
        const data = await Section.findById({ _id: req.query._id });
        response(req, res, activity, true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, false, 500, {}, errorMessage.internalServer, err.message);
    }
}