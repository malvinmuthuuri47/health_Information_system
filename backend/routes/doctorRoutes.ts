import express from 'express';
import { createDoctor } from '../controller/doctorController.ts';

const router = express.Router();

router.post('/newDoctor', createDoctor);

export default router;