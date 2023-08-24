import { verify } from '../utils/helper.js';

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing.' });
    }

    try {
        const decoded = verify(token);
        req.user = decoded.data;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(403).json({ message: 'Invalid token.' });
    }
};