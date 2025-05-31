"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controller/doctorController");
// import { loginDoctor, logoutDoctor } from '../controller/authController';
const protectRoutes_1 = require("../middleware/protectRoutes");
const router = express_1.default.Router();
// doctor authentication API
router.post('/register', doctorController_1.createDoctor);
router.post('/login', doctorController_1.loginDoctor);
router.post('/logout', doctorController_1.logoutDoctor);
// doctor application routes
router.get('/dashboard', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, doctorController_1.doctorDash);
// router.post('/', createProgram);
// router.post('/', updateProgram);
// router.post('/', deleteProgram);
// router.post('/', createClient);
// router.post('/', updateClient);
// router.post('/', deleteClient);
exports.default = router;
