import { Schema, model } from 'mongoose';
const programSchema = new Schema({
    title: String,
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    createdAt: { type: Date, default: Date.now }
});
export default model('Program', programSchema);
