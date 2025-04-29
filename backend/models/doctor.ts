import { Schema, model } from 'mongoose';

interface Idoctor {
    name: String,
    email: String,
    password: String,
    specialization: String
}

const doctorSchema = new Schema<Idoctor>({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    specialization: String
})

export default model('Doctor', doctorSchema);