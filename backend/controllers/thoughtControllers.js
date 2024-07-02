const Thought = require('../models/ThoughtModel');
const mongoose = require('mongoose');

// get all active thoughts 
const getActiveThoughts = async (req, res) => {
    const { userId, active } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: "no such user" });
    }

    try {
        const activeThoughts = await Thought.find({ authorId: userId, active: true });
        res.status(200).json(activeThoughts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get all inactive thoughts
const getInactiveThoughts = async (req, res) => {
    const { userId, inactive } = req.params;
    try {
        const inactiveThoughts = await Thought.find({ authorId: userId, active: false });
        res.status(200).json(inactiveThoughts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// create a new thought 
const createThought = async (req, res) => {
    const { userId, content, parked, active } = req.params;
    try {
        const thought = await Thought.create({
            content: content,
            authorId: userId,
            active: active,
            parked: parked,
            expireAt: "04/21/2025",
            likeCount: 0
        });
        res.status(200).json(thought);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a thought
const deleteThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const deletedThought = await Thought.findByIdAndDelete(thoughtId);
        if (deletedThought) {
            res.status(200).json({ message: 'Thought deleted successfully' });
        } else {
            res.status(404).json({ error: 'Thought not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const patchActiveStatus = async (req, res) => {
    const { thoughtId, desiredStatus } = req.params;
    try {
        const patchedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { active: desiredStatus },
            { new: true }
        );

        if (patchedThought) {
            res.status(200).json({ message: 'Thought patched successfully', thought: patchedThought });
        } else {
            res.status(404).json({ error: 'Thought not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = { createThought, getActiveThoughts, getInactiveThoughts, deleteThought, patchActiveStatus }