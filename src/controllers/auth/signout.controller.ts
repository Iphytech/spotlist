import { Request, Response } from 'express';

const signout = async (req: Request, res: Response) => {

    req.session = null
    res.send({})

};

export { signout as signoutRouter }