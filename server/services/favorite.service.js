import Favorites from '../models/favorites.model.js';
import Movie from '../models/movie.model.js';

export const addMovie = async (req, res) => {
    const { userId, movieId } = req.body;

    try {
        const movieAlreadyFavorited = await isMovieFavorited(userId, movieId);

        if ( !movieAlreadyFavorited ) {
            let favorites = await Favorites.findOne({ userId });

            if ( !favorites ) {
                favorites = new Favorites({
                    userId,
                    favorites_id: [],
                });
            }

            favorites.favorites_id.push(movieId);
            await favorites.save();
            res.status(201).json({ message: 'Movie added to favorites', favorites });
        } else {
            res.status(200).json({ message: 'Movie already in favorites', favorites });
        }
    } catch ( error ) {
        console.error('Error adding movie to favorites:', error);
        res.status(500).json({ message: 'Could not add movie to favorites' });
    }
};

export const isAlreadyFavorited = async (req, res) => {
    const { userId, movieId } = req.params;
    res.status(200).json({ isFavorited: await isMovieFavorited(userId, movieId) });
};

export const getFavoriteMovies = async (req, res) => {
    const userId = req.params.userId;

    try {
        const favoriteMovies = await findFavoriteMovies(userId);
        res.status(200).json({ favoriteMovies });
    } catch ( error ) {
        console.error('Error fetching favorite movies:', error);
        res.status(500).json({ message: 'Could not fetch favorite movies' });
    }
};

export const findFavoriteMovies = async (userId) => {
    try {
        const favorites = await Favorites.findOne({ userId: userId });

        if ( !favorites ) {
            return [];
        }

        const favoriteMovieIds = favorites.favorites_id;

        return await Movie.find({ _id: { $in: favoriteMovieIds } });

    } catch ( error ) {
        console.error('Error fetching favorite movies:', error);
        return [];
    }
};


export const removeMovieFromFavorites = async (req, res) => {
    const { userId, movieId } = req.params;

    try {
        let favorites = await Favorites.findOne({ userId: userId });

        if ( !favorites ) {
            return res.status(404).json({ message: 'Favorites not found.' });
        }

        if ( !favorites.favorites_id.includes(movieId) ) {
            return res.status(409).json({ message: 'Movie not found in favorites.' });
        }

        favorites.favorites_id = favorites.favorites_id.filter(id => id !== movieId);
        await favorites.save();

        res.status(200).json({ message: 'Movie removed from favorites', favorites });
    } catch ( error ) {
        console.error('Error removing movie from favorites:', error);
        res.status(500).json({ message: 'Could not remove movie from favorites' });
    }
};

const isMovieFavorited = async (userId, movieId) => {
    const favorites = await Favorites.findOne({ userId });
    if ( !favorites ) {
        return false;
    }
    return favorites.favorites_id.includes(movieId);
};
