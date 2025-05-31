import { Schema, model } from 'mongoose';

interface Iclient {
    name: String,
    dateOfBirth: Date,
    email: String,
    password: String,
    phone: String,
    address: String,
    registeredAt: Date,
    enrolledPrograms: Schema.Types.ObjectId
}

const clientSchema = new Schema<Iclient>({
    name: String,
    dateOfBirth: Date,
    email: { type: String, required: true, unique: true },
    password: { type:String, required: true },
    phone: String,
    address: String,
    registeredAt: { type: Date, default: Date.now },
    enrolledPrograms: [{ type: Schema.Types.ObjectId, ref: 'Program' }]
});

export default model<Iclient>('Client', clientSchema);