import express from 'express';

import {
    createUser,
    deleteUser,
    getUserById,
    getUserData,
    getUserRole,
    getUsers,
    updateUser
} from '../services/user.service.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { adminGuard, userGuard } from '../middleware/role.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware, adminGuard, getUsers)
    .post(authMiddleware, adminGuard, createUser);

router
    .route('/role')
    .get(authMiddleware, userGuard, getUserRole);

router
    .route('/info')
    .get(authMiddleware, userGuard, getUserData);

router
    .route('/:id')
    .get(authMiddleware, adminGuard, getUserById)
    .put(authMiddleware, adminGuard, updateUser)
    .patch(authMiddleware, adminGuard, updateUser)
    .delete(authMiddleware, adminGuard, deleteUser);

export default router;