"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['doctor', 'client'], required: true },
    specialization: String,
    phone: String,
    address: String,
    registeredAt: { type: Date, default: Date.now },
    enrolledPrograms: [{ type: mongoose_1.Schema.Types.ObjectId, ref: ' Program' }]
});
exports.default = (0, mongoose_1.model)('User', userSchema);
