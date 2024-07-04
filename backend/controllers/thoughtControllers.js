const Thought = require('../models/ThoughtModel');
const mongoose = require('mongoose');

// GET all active thoughts in the database
const getAllThoughts = async (req, res) => {
    try {
        const allThoughts = await Thought.find({ active: true });
        res.status(200).json(allThoughts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// GET all active thoughts for a specific userID 
const getActiveThoughts = async (req, res) => {
    const { userId } = req.params;

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

// GET all active unparked thoughts by a specific user
const getActiveUnparkedThoughts = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: "no such user" });
    }

    try {
        const activeThoughts = await Thought.find({ authorId: userId, active: true, parked: false });
        res.status(200).json(activeThoughts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET all inactive thoughts for a specific userID 
const getInactiveThoughts = async (req, res) => {
    const { userId, inactive } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: "no such user" });
    }

    try {
        const inactiveThoughts = await Thought.find({ authorId: userId, active: false });
        res.status(200).json(inactiveThoughts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET all nearby thoughts given coordinates
const getAllNearbyThoughts = async (req, res) => {
    const { longitude, latitude } = req.query;
    if (!longitude || !latitude) {
        return res.status(400).send({ error: 'Longitude and latitude are required' });
    }
    try {
        const thoughts = await Thought.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 10 // 10 meters
                }
            }
        });

        res.send(thoughts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// create a new thought 
const createThought = async (req, res) => {
    const { userId, username, content, active, parked, location, expireAt, likeCount } = req.body;
    try {
        const thought = await Thought.create({
            authorId: userId,
            username: username,
            content: content,
            active: active,
            parked: parked,
            location: location,
            expireAt: expireAt,
            likeCount: likeCount,
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

// PATCH the active status of a thought given a thoughtId
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

// PATCH the location of a thought with user's current location 
const patchLocation = async (req, res) => {
    const { thoughtId } = req.params;
    const { newLocation } = req.body;
    try {
        const patchedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { location: newLocation },
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
};




module.exports = {
    createThought,
    getActiveThoughts,
    getInactiveThoughts,
    deleteThought,
    patchActiveStatus,
    getAllThoughts,
    getActiveUnparkedThoughts,
    patchLocation,
    getAllNearbyThoughts
}