"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    name: String,
    dateOfBirth: Date,
    email: { type: String, required: true, unique: true },
    phone: String,
    address: String,
    registeredAt: { type: Date, default: Date.now },
    enrolledPrograms: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Program' }]
});
exports.default = (0, mongoose_1.model)('Client', clientSchema);
