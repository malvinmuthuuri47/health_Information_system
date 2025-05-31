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
exports.logoutDoctor = exports.loginDoctor = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const loginDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const doctor = yield doctor_1.default.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        console.log('Here is the doctor from teh database', doctor);
        const isMatch = yield bcryptjs_1.default.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: doctor._id, type: 'doctor' }, env_1.default.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true
        });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.loginDoctor = loginDoctor;
const logoutDoctor = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.logoutDoctor = logoutDoctor;
