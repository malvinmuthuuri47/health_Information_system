import express from 'express';
import { loginClient, clientDash, logoutClient } from '../controller/clientController';
import { requireClient } from '../middleware/protectRoutes';

const router = express.Router();

// client authentication API
router.post('/login', loginClient);

// client application routes
router.get('/dashboard/:clientId', requireClient, clientDash);
router.post('/logout', logoutClient);

export default router;