import Program from '../models/program';
import { Request, Response } from 'express';

export const createProgram = async (req: Request, res: Response) : Promise<any> => {
    try {
        console.log(req.body);
        // res.json({ message: 'You just hit the createProgram GET API' });
        const { title, description, doctorId } = req.body;

        const existingProgram = await Program.findOne({ title });

        if (existingProgram)
        {
            return res.status(400).json({ message: 'Program with same name exists' })
        }

        const program = new Program({
            title,
            description,
            createdBy: doctorId,
        });

        await program.save();
        res.status(201).json({ message: 'Program created successfully', program });
    } catch (error) {
        res.status(500).json({ message: "Error creating program", error });
    }
};