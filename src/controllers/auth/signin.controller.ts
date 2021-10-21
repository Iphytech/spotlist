import { Request, Response } from 'express';
import { User } from '../../models/index';
import { BadRequestError } from '../../errors/index'
import { Password, createResponse } from '../../utils/index'
import Jwt from 'jsonwebtoken'


const signin = async (req: Request, res: Response) => {

    const { name, password } = req.body
    const existingUser = await User.findOne({ name })

    if (!existingUser) {
        throw new BadRequestError("Invalid Credentials");
    }

    const passwordMatch = await Password.compare(
        existingUser.password, password
    )

    if (!passwordMatch) {
        throw new BadRequestError("Invalid Credentials");
    }

    //generate jwt
    const userJwt = Jwt.sign({
        id: existingUser.id,
        name: existingUser.name
    }, process.env.SECRET);

    //store it on session object
    req.session = {
        token: userJwt
    }

    //append the JWT to the user
    // existingUser.token = userJwt

    return createResponse(res, 200, "User login successful", existingUser)
   
}

export { signin as signinRouter }