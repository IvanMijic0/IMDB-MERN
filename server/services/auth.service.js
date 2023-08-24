import User from '../models/user.model.js';
import { cmpPwd, hashPassword, sign, verify } from '../utils/helper.js';

export const registerUser = async (req, res) => {
    const { password, ...user } = req.body;

    try {
        const userToSave = new User({ ...user, password: await hashPassword(password) });
        await userToSave.save();
        res.status(201).send('Successfully registered user.');
    } catch ( e ) {
        res.status(501).send('Could not register user.');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const isLoginValid = user && (await cmpPwd(password, user.password));

        if ( !isLoginValid ) {
            return res.status(401).send('Failed login.');
        }

        const token = await sign({ data: { email, password, role: user.role } });
        res.status(200).header('Authorization', `Bearer ${ token }`).send();
    } catch ( error ) {
        console.error('Error during login:', error);
        res.status(500).send('Login error.');
    }
};

export const validate = async (req, res) =>  {
    const { token } = req.body;

    try {
        const decoded = await verify(token);
        res.status(200).json(decoded);
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(410).send('Invalid Credentials.');
    }
};