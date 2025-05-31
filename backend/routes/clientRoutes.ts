import express from 'express';
import { createClient, loginClient, clientDash, logoutClient } from '../controller/clientController';
import { protectRoute, requireDoctor, requireClient } from '../middleware/protectRoutes';

const router = express.Router();

// client authentication API
router.post('/register', protectRoute, requireDoctor, createClient);
router.post('/login', loginClient);

// client application routes
router.get('/dashboard', requireClient, clientDash);
router.get('/logout', logoutClient);

export default router;