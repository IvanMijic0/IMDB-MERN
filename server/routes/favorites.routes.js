import express from 'express';

import {
    addMovie,
    getFavoriteMovies,
    isAlreadyFavorited,
    removeMovieFromFavorites
} from '../services/favorite.service.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { userGuard } from '../middleware/role.middleware.js';

const router = express.Router();

router
    .route('/')
    .post(authMiddleware, userGuard, addMovie);

router
    .route('/:userId/:movieId')
    .get(authMiddleware, userGuard, isAlreadyFavorited)
    .delete(authMiddleware, userGuard, removeMovieFromFavorites);

router
    .route('/:userId')
    .get(authMiddleware, userGuard, getFavoriteMovies);

export default router;
