import Client from '../models/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export const createClient = async (req:Request, res: Response) : Promise<any> => {
    try {
        console.log(req.body);
        const { name, dateOfBirth, email, password, phone, address } = req.body;

        const existingClient = await Client.findOne({ email });
        
        if (existingClient) {
            return res.status(400).json({ message: 'Client already exists with this email' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newClient = new Client({
            name,
            dateOfBirth,
            email,
            password: hashedPwd,
            phone,
            address
        });

        await newClient.save();
        
        res.status(201).json({ message: 'Client created successfully', client: newClient });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const loginClient = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { email, password } = req.body;

        const client = await Client.findOne({ email });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        console.log('Here is the Client from the database', client);

        const isMatch = await bcrypt.compare(password, client.password as string);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: client._id, type: 'client' },
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

export const clientDash = async (req: Request, res: Response) : Promise<any> => {
    try {
        const clientId = req.params.clientId;
        const client = await Client.findById(clientId)
        .populate('enrolledPrograms', 'title description createdBy');

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ client });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to fetch profile', error });
    }
}

export const updateClient = async (req: Request, res: Response) : Promise<any> => {
    try {
        const clientId = req.params.clientId;
        const { enrolledPrograms, ...otherUpdates } = req.body;
        console.log(clientId);
        
        const updatedClient = await Client.findByIdAndUpdate(clientId, otherUpdates, {
            new: true,
            runValidators: true
        })

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating client', error });
    }
}

export const logoutClient = (req: Request, res: Response) : any => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

export const deleteClient = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { clientId } = req.params;
    
        const deletedClient = await Client.findByIdAndDelete(clientId);
    
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json({ message: 'Client deleted successfully', deletedClient });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}