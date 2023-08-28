import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const favorites = new Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    userId: String,
    favorites_id: [String],
});

const Favorites = mongoose.model('Favorites', favorites);

export default Favorites;
