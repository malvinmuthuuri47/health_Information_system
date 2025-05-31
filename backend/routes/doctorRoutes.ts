import express from 'express';
import { createDoctor, doctorDash, loginDoctor, logoutDoctor } from '../controller/doctorController';
// import { loginDoctor, logoutDoctor } from '../controller/authController';
import { protectRoute, requireDoctor } from '../middleware/protectRoutes';

const router = express.Router();

// doctor authentication API
router.post('/register', createDoctor);
router.post('/login', loginDoctor);
router.post('/logout', logoutDoctor);

// doctor application routes
router.get('/dashboard', protectRoute, requireDoctor, doctorDash);
// router.post('/', createProgram);
// router.post('/', updateProgram);
// router.post('/', deleteProgram);

// router.post('/', createClient);
// router.post('/', updateClient);
// router.post('/', deleteClient);

export default router;