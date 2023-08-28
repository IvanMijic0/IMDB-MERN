import Favorites from '../models/favorites.model.js';

export const addMovie = async (req, res) => {
    const { userId, movieId } = req.body;

    try {
        let favorites = await Favorites.findOne({ userId: userId });

        if ( !favorites ) {
            favorites = new Favorites({
                userId: userId,
                favorites_id: [],
            });
        }

        favorites.favorites_id = favorites.favorites_id || [];
        favorites.favorites_id.push(movieId);
        await favorites.save();

        res.status(201).json({ message: 'Movie added to favorites', favorites });
    } catch ( error ) {
        console.error('Error adding movie to favorites:', error);
        res.status(500).json({ message: 'Could not add movie to favorites' });
    }
};

export const removeMovieFromFavorites = async (req, res) => {
    const { userId, movieId } = req.body;

    try {
        let favorites = await Favorites.findOne({ userId: userId });

        if ( !favorites ) {
            return res.status(404).json({ message: 'Favorites not found.' });
        }

        if ( !favorites.favorites_id.includes(movieId) ) {
            return res.status(404).json({ message: 'Movie not found in favorites.' });
        }

        favorites.favorites_id = favorites.favorites_id.filter(id => id !== movieId);
        await favorites.save();

        res.status(200).json({ message: 'Movie removed from favorites', favorites });
    } catch ( error ) {
        console.error('Error removing movie from favorites:', error);
        res.status(500).json({ message: 'Could not remove movie from favorites' });
    }
};
