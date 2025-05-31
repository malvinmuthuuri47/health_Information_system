import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

// protect doctor dashboard from unauthorized access
export const protectRoute = (req: Request, res: Response, next: NextFunction) : any => {
    try {
        // console.log(req)
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);
        (req as any).user = decoded;
        console.log((req as any).user);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
}

// middleware to check type of user is doctor
export const requireDoctor = (req: Request, res: Response, next: NextFunction) : any => {
    try {
        if ((req as any).user.type !== 'doctor') {
            return res.status(403).json({ message: 'Doctor access required' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error })
    }
}

// middleware to check type of user is client
export const requireClient = (req: Request, res: Response, next: NextFunction) : any => {
    try {
        if ((req as any).user.type !== 'client') {
            return res.status(403).json({ message: 'Client access required' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error })
    }
}