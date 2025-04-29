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
    createdBy: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    createdAt: { type: Date, default: Date.now }
})

export default model('Program', programSchema);