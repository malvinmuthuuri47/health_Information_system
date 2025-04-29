import { Schema, model } from 'mongoose';
const clientSchema = new Schema({
    name: String,
    dateOfBirth: Date,
    email: { type: String, required: true, unique: true },
    phone: String,
    address: String,
    registeredAt: { type: Date, default: Date.now },
    enrolledPrograms: [{ type: Schema.Types.ObjectId, ref: 'Program' }]
});
export default model('Client', clientSchema);
