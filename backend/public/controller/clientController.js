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
exports.logoutClient = exports.clientDash = exports.loginClient = exports.createClient = void 0;
const client_1 = __importDefault(require("../models/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { name, dateOfBirth, email, password, phone, address } = req.body;
        const existingClient = yield client_1.default.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: 'Client already exists with this email' });
        }
        const hashedPwd = yield bcryptjs_1.default.hash(password, 10);
        const newClient = new client_1.default({
            name,
            dateOfBirth,
            email,
            password: hashedPwd,
            phone,
            address
        });
        yield newClient.save();
        res.status(201).json({ message: 'Client created successfully', client: newClient });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createClient = createClient;
const loginClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const client = yield client_1.default.findOne({ email });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        console.log('Here is the Client from the database', client);
        const isMatch = yield bcryptjs_1.default.compare(password, client.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: client._id, type: 'client' }, env_1.default.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true
        });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.loginClient = loginClient;
const clientDash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({ message: 'You have successfully hit the client dashboard' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});
exports.clientDash = clientDash;
const logoutClient = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.logoutClient = logoutClient;
