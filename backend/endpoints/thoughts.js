const express = require('express');
const Thought = require('../models/ThoughtModel');
const { createThought, getActiveThoughts, getInactiveThoughts, deleteThought, patchActiveStatus } = require('../controllers/thoughtControllers');
const router = express.Router();

// POST a new thought
router.post('/:userId/:content/:parked/:active', createThought);

// GET all active thoughts by a specific user
router.get('/:userId/active', getActiveThoughts);

// GET all inactive thoughts by a specific user
router.get('/:userId/inactive', getInactiveThoughts);

// DELETE a thought by ID
router.delete('/:thoughtId', deleteThought);

// PATCH an active thought from active to inactive
router.patch('/:thoughtId/:desiredStatus', patchActiveStatus);

module.exports = router;
