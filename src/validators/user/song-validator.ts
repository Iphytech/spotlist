import { body, check } from 'express-validator';


export const getSpecificListOfSingleUserValidator = [
    check('listid').isString().isLength({ min: 6, max: 6 }).withMessage('List Id is required and must be valid')
]

export const addListToUserRecordValidator = [
    body('songs').isArray().withMessage('Song is required and must be an array')
]

export const addSongToListValidator = [
    check('listid').isString().isLength({ min: 6, max: 6 }).withMessage('List Id is required and must be valid'),
    body('songs').isObject().withMessage('Song is required and must be an object')

]