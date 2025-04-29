import express from 'express';
import { createDoctor } from '../controller/doctorController';

const router = express.Router();

// router.get('/newDoctor', createDoctor);
router.post('/newDoctor', createDoctor);

export default router;