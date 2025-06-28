"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controller/doctorController");
const clientController_1 = require("../controller/clientController");
const programController_1 = require("../controller/programController");
const protectRoutes_1 = require("../middleware/protectRoutes");
const enrollmentController_1 = require("../controller/enrollmentController");
const router = express_1.default.Router();
// doctor authentication API
router.post('/register', doctorController_1.createDoctor);
router.post('/login', doctorController_1.loginDoctor);
router.post('/logout', doctorController_1.logoutDoctor);
// doctor application routes
router.get('/dashboard', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, doctorController_1.doctorDash);
// client routes
router.get('/client/:clientId', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, clientController_1.clientDash);
router.post('/clientRegister', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, clientController_1.createClient);
router.patch('/updateClient/:clientId', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, clientController_1.updateClient);
router.delete('/deleteClient/:clientId', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, clientController_1.deleteClient);
// program API
router.post('/newProgram', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, programController_1.createProgram);
router.patch('/updateProgram/:programId', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, programController_1.updateProgram);
router.delete('/deleteProgram/:programId', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, programController_1.deleteProgram);
// enrollment API
router.post('/enrollClient', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, enrollmentController_1.enrollClientInProgram);
router.post('/disenrollClient', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, enrollmentController_1.disenrollClientInProgram);
exports.default = router;
