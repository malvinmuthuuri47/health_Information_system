"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const doctorSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    specialization: String
});
exports.default = (0, mongoose_1.model)('Doctor', doctorSchema);
