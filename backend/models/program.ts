import { Schema, model } from 'mongoose';

interface Iprogram {
    title: String,
    description: String,
    createdBy: Schema.Types.ObjectId,
    createdAt: Date
}

const programSchema = new Schema<Iprogram>({
    title: String,
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    createdAt: { type: Date, default: Date.now, required: true }
})

export default model<Iprogram>('Program', programSchema);