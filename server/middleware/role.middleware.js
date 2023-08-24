import { PERMISSIONS } from '../utils/enums.js';

export const checkRole = (req, res, next) => {
    const { user, method, url } = req;
    const endPoint = method.concat(url);

    if ( PERMISSIONS[user.role].includes(endPoint) ) {
        return next();
    }

    res.status(403).send('Not allowed');
};