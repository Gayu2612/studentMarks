import * as mongoose from 'mongoose';

export interface MarkDocument extends mongoose.Document {
    _id?: any;
    studendId?: any;
    name?: string;
    studentRollNo?: string;
    studentClass?: string;
    term?: string;
    total?: Number;
    tamil?: Number;
    english?: Number;
    maths?: Number;
    science?: Number;
    social?:Number;
    computer?: Number;
    subjects?: any[];
    status?: Number;
    isDeleted?: boolean;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const markSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    studendId: { type: mongoose.Types.ObjectId, ref: "Student" },
    name: { type: String },
    studentRollNo: { type: String },
    studentClass: { type: String },
    term: { type: String },
    subjects: [
        {
            _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
            subjectName: { type: String },
            subJectMark: {type: String },
            subjectGrade: { type: String },
            // tamil: { type: Number },
            // english: { type: Number },
            // maths: { type: Number },
            // science: { type: Number },
            // computer: { type: Number },
            // createdOn: { type: Date },
        }
    ],
    total: { type: Number },
    tamil: { type: Number },
    english: { type: Number },
    maths: { type: Number },
    science: { type: Number },
    social: { type: Number },
    computer: { type: Number },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});

export const Mark = mongoose.model('Mark', markSchema);
