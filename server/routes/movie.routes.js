import express from 'express';

import { createMovie, deleteMovie } from '../services/movie.service.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { userGuard } from '../middleware/role.middleware.js';

const router = express.Router();

router
    .route('/')
    .post(authMiddleware, userGuard, createMovie)
    .delete(authMiddleware, userGuard, deleteMovie);

export default router;
