import { Request, Response, NextFunction } from 'express';

interface Pagination {
    perPage: number,
    currentPage: number,
    totalPages: number,
    totalDocumentCount: number,
}

declare global {
    namespace Express {
        interface Request {
            pagination: Pagination;
        }
    }
}

export const paginateResponse = (req: Request, res: Response, next: NextFunction) => {

    req.pagination = {
        perPage: 50,
        currentPage: 1,
        totalPages: 1,
        totalDocumentCount: 1
    }
    
    if (req.query.perPage) {
        //@ts-ignore
        req.pagination.perPage = parseInt(req.query.perPage);
    }

    if (req.query.currentPage) {
        //@ts-ignore
        req.pagination.currentPage = parseInt(req.query.currentPage);
    }

    next()
}