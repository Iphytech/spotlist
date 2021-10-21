import mongoose from "mongoose";
import { Password } from '../utils/password';
const Schema = mongoose.Schema;


//  An interface that describes the properties that is required to create a new user

interface UserAttrs {
    name: string;
    password: string;
}

//  An interface that describes the properties that a user model has

interface UserModel extends mongoose.Model<UserDoc> {

    build(attrs: UserAttrs): UserDoc;
}

//  An interface that describes the propoerties that a user document has

export interface UserDoc extends mongoose.Document {
    name: string;
    unique_id: string;
    password: string;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, {

    // removing password  and _v from returning in the response when a user is created or fecthed
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
},
);

//a  middleware to be triggerd when a document is about being saved
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});


//A rewrite of the mongoose save method
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}


const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };