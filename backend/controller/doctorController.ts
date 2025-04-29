import Doctor from '../models/doctor';
import { Request, Response } from 'express';

export const createDoctor = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { name, email, password, specialization } = req.body;

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists with this email' });
        }

        const newDoctor = new Doctor({
            name,
            email,
            password,
            specialization,
        });

        await newDoctor.save();

        res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        // next(error);
    }
};