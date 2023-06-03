import * as mongoose from "mongoose";

export interface RegisterDocument extends mongoose.Document {
    _id?: any;
    userName?: string;
    mobile?: number;
    email?: string;
    password?: string;
    imageUrl?:string;
}
const registerSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userName: { type: String },
    mobile: { type: Number },
    email: { type: String },
    password: { type: String },
    imageUrl:{type:String}
})
export const Register = mongoose.model('register', registerSchema)
