"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientController_1 = require("../controller/clientController");
const protectRoutes_1 = require("../middleware/protectRoutes");
const router = express_1.default.Router();
// client authentication API
router.post('/register', protectRoutes_1.protectRoute, protectRoutes_1.requireDoctor, clientController_1.createClient);
router.post('/login', protectRoutes_1.requireClient, clientController_1.loginClient);
exports.default = router;
