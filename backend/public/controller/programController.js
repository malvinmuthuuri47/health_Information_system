"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgram = void 0;
const program_1 = __importDefault(require("../models/program"));
const createProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        // res.json({ message: 'You just hit the createProgram GET API' });
        const { title, description, doctorId } = req.body;
        const existingProgram = yield program_1.default.findOne({ title });
        if (existingProgram) {
            return res.status(400).json({ message: 'Program with same name exists' });
        }
        const program = new program_1.default({
            title,
            description,
            createdBy: doctorId,
        });
        yield program.save();
        res.status(201).json({ message: 'Program created successfully', program });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating program", error });
    }
});
exports.createProgram = createProgram;
