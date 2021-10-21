import express from 'express'
const router = express.Router();
import { validateRequest,currentUser } from '../middlewares/index';
import * as v from '../validators/auth/index'

/*
|-------------------------------------------------------------------------------
| Controller Import
|-------------------------------------------------------------------------------
*/
import * as c from "../controllers/auth/index";

/*
|-------------------------------------------------------------------------------
| Route Declearation
|-------------------------------------------------------------------------------
*/

/*----------Signup Routes--------------------*/
router.post('/signup', v.signupValidator,validateRequest, c.signupRouter);


/*----------Login Routes--------------------*/
router.post('/signin', v.signinValidator,validateRequest, c.signinRouter);


/*----------Other Auth Routes--------------------*/
router.post('/signout', c.signoutRouter);
router.post('/currentuser',currentUser, c.currentUserRouter);



/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
export { router as authRoutes }