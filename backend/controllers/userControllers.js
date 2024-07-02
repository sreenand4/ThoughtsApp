const User = require('../models/UserModel');
const Thought = require('../models/ThoughtModel')
const mongoose = require('mongoose');
// POST a user
const createUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.create({ username: username });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET user by username
const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            res.status(200).json({ userId: user._id });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE a user
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: "no such user" });
    }
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: userId });
        await Thought.deleteMany({ authorId: userId });
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { createUser, getUser, deleteUser };