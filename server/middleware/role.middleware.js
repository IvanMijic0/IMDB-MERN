import { ROLES } from '../utils/enums.js';

const roleGuard = (requiredRole) => (req, res, next) => {
    const { user } = req;

    if (user.role === requiredRole) {
        return next();
    }

    res.status(403).send('Not allowed');
};

export const adminGuard = roleGuard(ROLES.ADMIN);
export const userGuard = roleGuard(ROLES.USER);
