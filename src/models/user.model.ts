import * as mongoose from "mongoose";

// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose);

export interface UserDocument extends mongoose.Document {
    _id?: any;
    userName?: string;
    mobile?: number;
    email?: string;
    role?: any;
    password?: string;
    default?: number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string; 
    modifiedOn?: Date;
    modifiedBy?: string;
}

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userName: { type: String },
    mobile: { type: Number },
    email: { type: String, lowercase: true, trim: true },
    role: { type: mongoose.Types.ObjectId, ref: 'Role' },
    password: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    default: { type: Number, default: 2 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});

// userSchema.plugin(autoIncrement.plugin, {
//     model: 'User',
//     field: 'userCode',
//     startAt: 3,
//     incrementBy: 1
// });

export const User = mongoose.model("User", userSchema);