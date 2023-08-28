import express from 'express';
import { addMovie, removeMovieFromFavorites } from '../services/favorite.service.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { userGuard } from '../middleware/role.middleware.js';

const router = express.Router();

router
    .route('/')
    .post(authMiddleware, userGuard, addMovie)
    .delete(authMiddleware, userGuard, removeMovieFromFavorites);

export default router;
