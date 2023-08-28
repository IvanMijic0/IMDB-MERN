import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const movie
    = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    poster_path: String,
    original_title: String,
    release_date: String,
    vote_average: String,
    overview: String,
});

const Movie = mongoose.model('movies', movie);

export default Movie;