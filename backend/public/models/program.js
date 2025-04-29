"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const programSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor' },
    createdAt: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Program', programSchema);
