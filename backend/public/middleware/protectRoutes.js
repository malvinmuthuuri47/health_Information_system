"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireClient = exports.requireDoctor = exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
// protect doctor dashboard from unauthorized access
const protectRoute = (req, res, next) => {
    try {
        // console.log(req)
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
};
exports.protectRoute = protectRoute;
// middleware to check type of user is doctor
const requireDoctor = (req, res, next) => {
    try {
        console.log('requireDoctor', req.user);
        if (req.user.type !== 'doctor') {
            return res.status(403).json({ message: 'Doctor access required' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};
exports.requireDoctor = requireDoctor;
// middleware to check type of user is client
const requireClient = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        // console.log('requireClient', (req as any).user);
        console.log('requireClient', req.user);
        if (req.user.type !== 'client') {
            return res.status(403).json({ message: 'Client access required' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};
exports.requireClient = requireClient;
