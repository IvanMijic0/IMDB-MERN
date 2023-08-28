import User from '../models/user.model.js';

import { hashPassword, retrieveToken, verify } from '../utils/helper.js';
import { JWT_SECRET } from '../utils/constants.js';

export const getUsers = async (req, res) => {
    res.json(await User.find().select('-password'));
};

export const getUserById = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id).select('-password');

        if ( !user ) return res.status(404).send('User not found.');
        res.json(user);
    } catch ( e ) {
        console.error('Error fetching user:', e);
        res.status(500).send('Could not fetch user.');
    }
};

/*
    For Testing
*/
export const createUser = async (req, res) => {
    const { password, ...userData } = req.body;

    userData.password = await hashPassword(password);

    try {
        const newUser = await User.create(userData);
        const { password: _omit, ...userWithoutPassword } = newUser.toObject();
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Could not create user.' });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Could not update user.' });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Could not delete user.' });
    }
};

export const getUserRole = async (req, res) => {
    const token = await retrieveToken(req, res)

    try {
        const decodedData = await verify(token, JWT_SECRET);
        const userId = decodedData.data._id;

        const user = await User.findById(userId).select('role');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ role: user.role });
    } catch (error) {
        console.error('Error fetching user role:', error);
        res.status(500).json({ message: 'Could not fetch user role.' });
    }
};

export const getUserData = async (req, res) => {
    const token = await retrieveToken(req, res)

    try {
        const decodedData = await verify(token, JWT_SECRET);
        const userId = decodedData.data._id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ userData: user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Could not fetch user data.' });
    }
};
