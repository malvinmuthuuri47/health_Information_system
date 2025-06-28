import express from 'express';
import { createProgram } from '../controller/programController';

const router = express.Router();

// program API
// router.get('/newProgram', createProgram);
router.post('/newProgram', createProgram);

export default router;