import { body } from 'express-validator';

export const signupValidator = [
    body('name').isString().withMessage('Name is required'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('password is required and must be atleast 4 charcters'),
]