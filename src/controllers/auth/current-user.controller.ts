import { Request, Response } from 'express';
import { createResponse } from '../../utils/index';

const currentUser = async (req: Request, res: Response) => {
  
  return createResponse(res, 200,"",req.currentUser || null)
  
};

export { currentUser as currentUserRouter }