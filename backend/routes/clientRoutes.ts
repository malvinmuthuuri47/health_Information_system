import express from 'express';
import { createClient, loginClient } from '../controller/clientController';
import { protectRoute, requireDoctor, requireClient } from '../middleware/protectRoutes';

const router = express.Router();

// client authentication API
router.post('/register', protectRoute, requireDoctor, createClient);
router.post('/login', requireClient, loginClient);

export default router;