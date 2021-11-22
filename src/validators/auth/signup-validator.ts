import { body } from 'express-validator';

export const signupValidator = [
    body('name').isString().withMessage('Name is required'),
    body('password').trim().isLength({ min: 4, max: 20 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('password is required and must be atleast 4 charcters, must include one lowercase character, one uppercase character, a number, and a special character.'),
]