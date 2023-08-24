import express from 'express';
import { login, registerUser, validate } from '../services/auth.service.js';

const router = express.Router();

router
    .post('/register', registerUser)
    .post('/login', login)
    .post('/validate', validate);

export default router;