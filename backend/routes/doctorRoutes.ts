import express from 'express';
import { createDoctor, doctorDash, loginDoctor, logoutDoctor } from '../controller/doctorController';
import { createClient, updateClient, deleteClient } from '../controller/clientController';
import { createProgram, updateProgram, deleteProgram } from '../controller/programController';
import { protectRoute, requireDoctor } from '../middleware/protectRoutes';

const router = express.Router();

// doctor authentication API
router.post('/register', createDoctor);
router.post('/login', loginDoctor);
router.post('/logout', logoutDoctor);

// doctor application routes
router.get('/dashboard', protectRoute, requireDoctor, doctorDash);

// client routes
router.post('/clientRegister', protectRoute, requireDoctor, createClient);
router.patch('/updateClient/:clientId', protectRoute, requireDoctor, updateClient);
router.delete('/deleteClient/:clientId', protectRoute, requireDoctor, deleteClient);

// program API
router.post('/newProgram', protectRoute, requireDoctor, createProgram);
router.patch('/updateProgram/:programId', protectRoute, requireDoctor, updateProgram);
router.delete('/deleteProgram/:programId', protectRoute, requireDoctor, deleteProgram);

export default router;