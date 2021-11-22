import express from 'express'
const router = express.Router();
import { validateRequest, currentUser, requireAuth, paginateResponse } from '../middlewares/index';
import * as v from '../validators/user/song-validator';

/*
|-------------------------------------------------------------------------------
| Controller Import
|-------------------------------------------------------------------------------
*/
import * as c from '../controllers/user/song.contoller'
/*
|-------------------------------------------------------------------------------
| Route Declearation
|-------------------------------------------------------------------------------
*/

/*---------- Routes--------------------*/

router.get('/lists', currentUser, requireAuth, validateRequest, paginateResponse, c.getSingleUserListRouter);
router.get('/lists/:listid', currentUser, requireAuth, v.getSpecificListOfSingleUserValidator, validateRequest, c.getSpecificListOfSingleUserRouter);
router.post('/lists', currentUser, requireAuth, v.addListToUserRecordValidator, validateRequest, c.addListToUserRecordRouter);
router.post('/lists/:listid/songs', currentUser, requireAuth, v.addSongToListValidator, validateRequest, c.addSongToListRouter);



/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
export { router as userRoutes }