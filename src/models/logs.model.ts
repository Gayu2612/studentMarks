import * as mongoose from "mongoose";


export interface LogsDocument extends mongoose.Document {
    _id?: any;
    employee?: any;
    client?: any;
    user?: any;
    company?: any;
    time?: number;
    date?: Date;
    activity?: string;
    ipAddess?: string;
    description?: string;
    url?:string;
    reqData?: any;
    resData?: any;
    processStatus?: Boolean;
    statusCode?: number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

const logsSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    employee: { type: mongoose.Types.ObjectId, ref: 'Employee' },
    client: { type: mongoose.Types.ObjectId, ref: 'Client' },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    company: { type: mongoose.Types.ObjectId, ref: 'Company' },
    time: { type: Number },
    date: { type: Date },
    ipAddess: { type: String },
    statusCode: { type: Number },
    activity: { type: String },
    reqData: {type: String},
    resData: {type: String},
    url: { type: String },
    description: { type: String },
    processStatus: { type: Boolean },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});



export const Logs = mongoose.model("Logs", logsSchema);
