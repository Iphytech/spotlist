import { Request, Response } from 'express';
import { User } from '../../models';
import { BadRequestError } from '../../errors/index'
import { createResponse } from '../../utils/index';
import Jwt from 'jsonwebtoken'

const signup = async (req: Request, res: Response) => {

    const { name, password } = req.body
    const existingUser = await User.findOne({ name })

    if (existingUser) {
        throw new BadRequestError("Name already exist");
    }
    //@ts-ignore
    const user = User.build({ name, password })
    await user.save()

    //@ts-ignore
    const user = User.build({ user })
    await user.save()



    //generate jwt
    const userJwt = Jwt.sign({
        id: user.id,
        name: user.name
    }, process.env.SECRET);

    //store it on session object
    req.session = {
        token: userJwt
    }

    //append the JWT to the user
    // user.token = userJwt


    return createResponse(res, 200, "User successfully registered", user)
}

export { signup as signupRouter }