import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const movie
    = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    date: {
        type: Date,
        default: Date()
    },
    userId: String
});

const Movie = mongoose.model('movies', movie);

export default Movie;