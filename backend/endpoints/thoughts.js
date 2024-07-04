const express = require('express');
const Thought = require('../models/ThoughtModel');
const {
    createThought,
    getActiveThoughts,
    getInactiveThoughts,
    deleteThought,
    patchActiveStatus,
    getAllThoughts,
    getActiveUnparkedThoughts,
    patchLocation,
    getAllNearbyThoughts } = require('../controllers/thoughtControllers');

const router = express.Router();

// POST a new thought
router.post('/createThought', createThought);

// GET all thoughts
router.get('/active', getAllThoughts);

// GET all active thoughts by a specific user
router.get('/:userId/active', getActiveThoughts);

// GET all active unparked thoughts by a specific user
router.get('/:userId/active/unparked', getActiveUnparkedThoughts);

// GET all inactive thoughts by a specific user
router.get('/:userId/inactive', getInactiveThoughts);

// GET all Nearby thoughts give coordinates
router.get('/nearby', getAllNearbyThoughts);

// DELETE a thought by ID
router.delete('/:thoughtId', deleteThought);

// PATCH an active thought from active to inactive
router.patch('/:thoughtId/:desiredStatus', patchActiveStatus);

// PATCH the location of a thought with user's current location 
router.patch('/:thoughtId', patchLocation)

module.exports = router;
