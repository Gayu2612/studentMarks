import * as mongoose from 'mongoose';

export interface SectionDocument extends mongoose.Document {
    _id?: any;
    sectionName?: String;
    status?: Number;
    isDeleted?: boolean;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const SectionSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    sectionName: { type: String },
    status: { type: Number, default: 1 },   
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});

export const Section = mongoose.model('Section', SectionSchema);
