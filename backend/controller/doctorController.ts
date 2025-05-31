import Doctor from '../models/doctor';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export const createDoctor = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { name, email, password, specialization } = req.body;

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists with this email' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newDoctor = new Doctor({
            name,
            email,
            password: hashedPwd,
            specialization,
        });

        await newDoctor.save();

        res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const loginDoctor = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { email, password } = req.body;

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        console.log('Here is the doctor from teh database', doctor);

        const isMatch = await bcrypt.compare(password, doctor.password as string);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: doctor._id, type: 'doctor' },
            env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true
        })

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


// another controller for the dashboard
export const doctorDash = (req: Request, res: Response) : any => {
    res.status(200).json({ message: 'Welcome to the doctor dashboard' });
}

export const logoutDoctor = (req: Request, res: Response) : any => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}