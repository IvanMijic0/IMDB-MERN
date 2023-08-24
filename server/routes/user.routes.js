import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../services/user.service.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminGuard } from '../middleware/role.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware, adminGuard, getUsers)
    .post(authMiddleware, adminGuard, createUser);

router
    .route('/:id')
    .get(authMiddleware, adminGuard, getUserById)
    .put(authMiddleware, adminGuard, updateUser)
    .patch(authMiddleware, adminGuard, updateUser)
    .delete(authMiddleware, adminGuard, deleteUser);

export default router;