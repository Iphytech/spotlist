import { Request, Response } from 'express';
import crypto from 'crypto';
import { BadRequestError } from '../../errors';
import { createResponse, configurePaginationParams } from '../../utils/index';
import { Song } from '../../models/index';


const getSingleUserList = async (req: Request, res: Response) => {

    const userId = req.currentUser["id"]
    const totalDocumentCount = await Song.find({ user: userId }).countDocuments();
    configurePaginationParams(req, totalDocumentCount);

    const existingLists = await Song.find({ user: userId }).sort({ createdAt: -1 })
        .skip((req.pagination.currentPage - 1) * req.pagination.perPage)
        .limit(req.pagination.perPage);

    return createResponse(res, 200, "User lists succeessfully returned", existingLists, req.pagination)

}

const getSpecificListOfSingleUser = async (req: Request, res: Response) => {
    const listId = req.params.listid;
    const userId = req.currentUser["id"]

    const existingUserList = await Song.find({ user: userId, listId: listId }).sort({ createdAt: -1 })
    return createResponse(res, 200, "User Lists successfully returned", existingUserList);

}


const addListToUserRecord = async (req: Request, res: Response) => {
    const userId = req.currentUser["id"]
    const { songs } = req.body;
    const listId = crypto.randomBytes(3).toString('hex');;

    const newList = Song.build({ user: userId, listId: listId, songs: songs });
    await newList.save();

    return createResponse(res, 200, "New song successfully added to the User List", newList);

}



const addSongToList = async (req: Request, res: Response) => {
    const userId = req.currentUser["id"]
    const listId = req.params.listid;
    const { songs } = req.body;
    // make sure that it is the list owner
    const userSong = await Song.findOne({ user: userId, listId: listId })

    if (!userSong) {
        throw new BadRequestError("User is not the owner of the list or the list does not exist");
    }

    await Song.updateOne(
        { user: userId, listId: listId },
        { "$push": { songs: songs } }, { new: true });
    const updatedList = await Song.findOne({ user: userId, listId: listId });

    return createResponse(res, 200, "New song successfully added to the User List", updatedList);

}



export { getSingleUserList as getSingleUserListRouter, getSpecificListOfSingleUser as getSpecificListOfSingleUserRouter, addListToUserRecord as addListToUserRecordRouter, addSongToList as addSongToListRouter }