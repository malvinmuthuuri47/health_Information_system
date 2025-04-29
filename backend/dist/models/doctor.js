import { Schema, model } from 'mongoose';
const doctorSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    specialization: String
});
export default model('Doctor', doctorSchema);
