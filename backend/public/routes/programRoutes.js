"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const programController_1 = require("../controller/programController");
const protectRoutes_1 = require("../middleware/protectRoutes");
const router = express_1.default.Router();
// program API
router.post('/newProgram', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, programController_1.createProgram);
router.post('/updateProgram', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, programController_1.updateProgram);
router.post('/deleteProgram', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, programController_1.deleteProgram);
exports.default = router;
