import { Request, Response } from 'express';
import Client from '../models/client';
// import Program from '../models/program';

export const enrollClientInProgram = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { clientId, programId } = req.body;

        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: ' Client not found' });
        }

        const isAlreadyEnrolled = client.enrolledPrograms.some(
            (id) => id.toString() === programId
        );

        if (isAlreadyEnrolled) {
            return res.status(400).json({ message: 'Client is already enrolled in this program' });
        }

        client.enrolledPrograms.push(programId);

        await client.save();

        res.status(200).json({ message: 'Client enrolled successfully in the program', client });
    } catch (error) {
        return res.status(500).json({ message: 'Enrollment failed', error });
    }
}

export const disenrollClientInProgram = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { clientId, programId } = req.body;

        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const isEnrolled = client.enrolledPrograms.some(
            (id) => id.toString() === programId
        );

        if (!isEnrolled) {
            return res.status(400).json({ message: 'Client is not enrolled in this program' });
        }

        client.enrolledPrograms = client.enrolledPrograms.filter(
            (id) => id.toString() !== programId
        );

        await client.save();

        res.status(200).json({ message: 'Disenrolled successfully', client });
    } catch (error) {
        return res.status(500).json({ message: 'Disenrollment failed', error });
    }
}