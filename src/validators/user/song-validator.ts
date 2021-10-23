import { body, check } from 'express-validator';

export const getSingleUserListValidator = [
    check('userid').isString().isLength({ min: 24, max: 24 }).withMessage('User Id is required and must be valid')
]

export const getSpecificListOfSingleUserValidator = [
    check('userid').isString().isLength({ min: 24, max: 24 }).withMessage('User Id is required and must be valid'),
    check('listid').isString().isLength({ min: 6, max: 6 }).withMessage('List Id is required and must be valid')
]

export const addListToUserRecordValidator = [
    check('userid').isString().isLength({ min: 24, max: 24 }).withMessage('User Id is required and must be valid'),
    body('songs').isArray().withMessage('Song is required and must be an array')
]

export const addSongToListValidator = [
    check('userid').isString().isLength({ min: 24, max: 24 }).withMessage('User Id is required and must be valid'),
    check('listid').isString().isLength({ min: 6, max: 6 }).withMessage('List Id is required and must be valid'),
    body('songs').isObject().withMessage('Song is required and must be an object')

]