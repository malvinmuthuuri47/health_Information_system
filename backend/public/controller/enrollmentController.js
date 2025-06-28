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
exports.disenrollClientInProgram = exports.enrollClientInProgram = void 0;
const client_1 = __importDefault(require("../models/client"));
// import Program from '../models/program';
const enrollClientInProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, programId } = req.body;
        const client = yield client_1.default.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: ' Client not found' });
        }
        const isAlreadyEnrolled = client.enrolledPrograms.some((id) => id.toString() === programId);
        if (isAlreadyEnrolled) {
            return res.status(400).json({ message: 'Client is already enrolled in this program' });
        }
        client.enrolledPrograms.push(programId);
        yield client.save();
        res.status(200).json({ message: 'Client enrolled successfully in the program', client });
    }
    catch (error) {
        return res.status(500).json({ message: 'Enrollment failed', error });
    }
});
exports.enrollClientInProgram = enrollClientInProgram;
const disenrollClientInProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, programId } = req.body;
        const client = yield client_1.default.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        const isEnrolled = client.enrolledPrograms.some((id) => id.toString() === programId);
        if (!isEnrolled) {
            return res.status(400).json({ message: 'Client is not enrolled in this program' });
        }
        client.enrolledPrograms = client.enrolledPrograms.filter((id) => id.toString() !== programId);
        yield client.save();
        res.status(200).json({ message: 'Disenrolled successfully', client });
    }
    catch (error) {
        return res.status(500).json({ message: 'Disenrollment failed', error });
    }
});
exports.disenrollClientInProgram = disenrollClientInProgram;
