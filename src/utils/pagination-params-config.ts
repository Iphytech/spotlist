import { Request, Response } from 'express';

const configurePaginationParams = async (req: Request, totalDocumentCount = 1) => {
    req.pagination.totalDocumentCount = totalDocumentCount;
    req.pagination.totalPages = Math.ceil(totalDocumentCount / req.pagination.perPage);
};

export { configurePaginationParams };