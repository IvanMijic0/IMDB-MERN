import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../services/user.service.js';

const router = express.Router();

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .patch(updateUser)
    .delete(deleteUser);

export default router;