import mongoose from 'mongoose';

const { Schema } = mongoose;

const movie
    = new Schema({
    _id: String,
    poster_path: String,
    original_title: String,
    release_date: String,
    vote_average: String,
    overview: String,
});

const Movie = mongoose.model('movies', movie);

export default Movie;