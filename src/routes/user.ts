import express from 'express'
const router = express.Router();
import { validateRequest, currentUser, requireAuth } from '../middlewares/index';
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

router.get('/:userid/lists', requireAuth, v.getSingleUserListValidator, validateRequest, c.getSingleUserListRouter);
router.get('/:userid/lists/:listid', requireAuth, v.getSpecificListOfSingleUserValidator, validateRequest, c.getSpecificListOfSingleUserRouter);
router.post('/:userid/lists', v.addListToUserRecordValidator, validateRequest, c.addListToUserRecordRouter);
router.post('/:userid/lists/:listid/songs', validateRequest, c.addSongToListRouter);



/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
export { router as userRoutes }