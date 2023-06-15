import * as mongoose from 'mongoose';

export interface ClassDocument extends mongoose.Document {
    _id?: any;
    std?: Number;
    sectionName:any;
    status?: Number;
    isDeleted?: boolean;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const ClassSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    std: { type: Number },
    sectionName: { type: mongoose.Types.ObjectId, ref: 'Section' },
    status: { type: Number, default: 1 },   
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});

export const Class = mongoose.model('Class', ClassSchema);
