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
router.post('/login', clientController_1.loginClient);
// client application routes
router.get('/dashboard/:clientId', protectRoutes_1.requireClient, clientController_1.clientDash);
router.post('/logout', clientController_1.logoutClient);
exports.default = router;
