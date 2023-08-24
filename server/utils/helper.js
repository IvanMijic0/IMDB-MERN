import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JWT_SECRET, SALT_ROUNDS } from './constants.js';

const env = dotenv.config();
env.error &&
(
    console.error("Error loading .env file:", env.error),
        process.exit(1)
);

export const hashPassword = async (pwd) => {
    return await bcrypt.hash(pwd, SALT_ROUNDS);
};

export const cmpPwd = async (pwd, hash) => {
    return await bcrypt.compare(pwd, hash);
};

export const sign = async (data) => {
    return await jwt.sign(data, JWT_SECRET);
};

export const verify = async (tkn) => {
    return jwt.verify(tkn, JWT_SECRET);
};