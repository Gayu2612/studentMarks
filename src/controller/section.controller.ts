import { validationResult } from "express-validator"
import * as async from 'async';
import { response } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { Mark, MarkDocument } from "../models/mark.model";
import { Section, SectionDocument } from "../models/section.model";

var activity = 'StudentMarks';

/**
 * @author Viveka S
 * @date 16-07-2022
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Student
 */


export const saveSection = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const SectionDetails: SectionDocument = req.body;
            SectionDetails.sectionName = SectionDetails.sectionName?.toLowerCase()
            const data = await Section.findOne({ $and: [{ sectionName: SectionDetails.sectionName }, { isDeleted: false }] });
            if (!data) {
                const createSectionDetails = new Section(SectionDetails);
                const data = await createSectionDetails.save();
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

export let getAllSection = async (req, res, next) => {
    try {
        const data = await Section.find({ isDeleted: false });
        response(req, res, activity, true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, false, 500, {}, errorMessage.internalServer, err.message);
    }
};

export let updateSection = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const SectionDetails: SectionDocument = req.body;
            SectionDetails.sectionName = SectionDetails.sectionName?.toLowerCase()
            const data = await Section.findOne({ $and: [{ _id: { $ne: SectionDetails._id } }, { sectioName: SectionDetails.sectionName }, { isDeleted: false }] })

            if (!data) {
                const updateSection = new Section(SectionDetails)
                let insertStudent = await updateSection.updateOne({
                    $set: {
                        sectionName: SectionDetails.sectionName,
                        modifiedOn: SectionDetails.modifiedOn,
                        modifiedBy: SectionDetails.modifiedBy
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



export let deleteSection = async (req, res, next) => {
    try {
        let { modifiedOn, modifiedBy } = req.body;
        let id = req.query._id;
        const data = await Section.findByIdAndUpdate({ _id: id }, {
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