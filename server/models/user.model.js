import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const user
    = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    email: String,
    password: String,
    role: String,
    UserInfo: {
        firstName: String,
        lastName: String
    },
    date: {
        type: Date,
        default: Date()
    },
});

const User = mongoose.model('users', user);

export default User;