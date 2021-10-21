import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    name: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    const token =
        req?.body?.token ??
        req?.query?.token ??
        req?.headers["x-access-token"] ??
        req?.session?.token;

    if (!token) {
        return next()
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET!) as UserPayload
        req.currentUser = payload;
    } catch (error) {

    }

    next()
}