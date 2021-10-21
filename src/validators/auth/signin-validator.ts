import { body } from 'express-validator';

export const signinValidator = [
    body('name').isString().withMessage('Name is required'),
    body('password').isString().withMessage('Password is required'),
]