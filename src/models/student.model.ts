import * as mongoose from 'mongoose';

export interface StudentDocument extends mongoose.Document {
    _id?: any;
    dateOfBirth?: Date;
    age?: Number;
    address?: String;
    status?: Number;
    isDeleted?: boolean;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const studentSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    name: { type: String },
    dateOfBirth: { type: Date },
    age: { type: Number },
    address: { type: String },
    status: { type: Number, default: 1 },   
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});

export const Student = mongoose.model('Student', studentSchema);
