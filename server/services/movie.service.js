import Movie from '../models/movie.model.js';

export const createMovie = async (req, res) => {
    try {
        const { poster_path } = req.body;

        const existingMovie = await Movie.findOne({ poster_path });

        if ( existingMovie ) {
            return res.status(409).json({ message: 'Movie exists in db.' });
        }

        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();

        res.status(201).json(savedMovie._id);
    } catch ( error ) {
        console.error('Error creating movie:', error);
        res.status(500).json({ message: 'Could not create movie.' });
    }
};

export const deleteMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found.' });
        }

        res.status(200).json({ message: 'Movie deleted successfully.' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Could not delete movie.' });
    }
};