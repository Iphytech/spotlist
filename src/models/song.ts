import mongoose, { Date } from "mongoose";
import { UserDoc } from './index';
const Schema = mongoose.Schema;

//  An interface that describes the properties that is required to create a list

interface SongAttrs {
    user: UserDoc;
    listId: string;
    songs: Array<songsDetails>;
}

interface songsDetails {
    artist: string;
    title: string;
}

//an interface that describes the properties that a song model has
//it connects the properties need to create a list, with the actual
//songs properties

interface SongModel extends mongoose.Model<SongDoc> {
    build(attrs: SongAttrs): SongDoc;
}

// /an interface that describes the properties a song document
export interface SongDoc extends mongoose.Document {
    user: string;
    listId: string;
    songs: Array<songsDetails>;
    createdAt: Date;
    updatedAt: Date;
}

//a schema corresponding to the document description above

const songSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    listId: {
        type: String,
        required: true,
        unique: true
    },
    songs: [{
        artist: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    }]

},
    {
        timestamps: true
    });



//A rewrite of the mongoose save method
songSchema.statics.build = (attrs: SongAttrs) => {
    return new Song(attrs)
}

//@ts-ignore
const Song = mongoose.model<SongDoc, SongModel>("Song", songSchema);
export { Song }
