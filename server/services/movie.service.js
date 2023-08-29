import Movie from '../models/movie.model.js';

export const createMovie = async (req, res) => {
    try {
        const movieData = req.body;

        const existingMovie = await Movie.findOne({ poster_path: movieData.poster_path });

        if ( existingMovie ) {
            return res.status(200).json({ message: 'Movie exists in db.', movieId: existingMovie._id });
        }

        const newMovie = new Movie(movieData);
        await newMovie.save();

        res.status(201).json({ message: 'Movie was added to database.' });
    } catch ( error ) {
        console.error('Error creating movie:', error);
        res.status(500).json({ message: 'Could not create movie.' });
    }
};

export const deleteMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        if ( !deletedMovie ) {
            return res.status(404).json({ message: 'Movie not found.' });
        }

        res.status(200).json({ message: 'Movie deleted successfully.' });
    } catch ( error ) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Could not delete movie.' });
    }
};