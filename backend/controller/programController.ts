import Program from '../models/program';
import { Request, Response } from 'express';

export const createProgram = async (req: Request, res: Response) : Promise<any> => {
    try {
        console.log(req.body);
        console.log((req as any).user);
        // res.json({ message: 'You just hit the createProgram GET API' });
        const { title, description } = req.body;

        if (!(req as any).user || (req as any).user.type !== 'doctor') {
            return res.status(403).json({ message: "Unauthorized: Doctor access required" });
        }

        const doctorId = (req as any).user.id;

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

export const updateProgram = async (req: Request, res: Response) : Promise<any> => {
    try {
            const programId = req.params.programId;
            const updates = req.body;
            console.log(programId);
            
            const updatedProgram = await Program.findByIdAndUpdate(programId, updates, {
                new: true,
                runValidators: true
            })
    
            if (!updatedProgram) {
                return res.status(404).json({ message: 'Client not found' });
            }
    
            return res.status(200).json({ message: 'Client updated successfully', client: updatedProgram });
        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error });
        }
}

export const deleteProgram = async (req: Request, res: Response) : Promise<any> => {
    try {
            const { programId } = req.params;
        
            const deletedProgram = await Program.findByIdAndDelete(programId);
        
            if (!deletedProgram) {
                return res.status(404).json({ message: 'Client not found' });
            }
    
            return res.status(200).json({ message: 'Client deleted successfully', deletedProgram });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
}