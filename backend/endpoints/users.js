const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();
const { createUser, getUser, deleteUser } = require('../controllers/userControllers');

// POST a user
router.post('/:username', createUser);

// GET a specific user by username and return their userID
router.get('/:username', getUser);

// DELETE a user given the userId
router.delete('/:userId', deleteUser);

module.exports = router;
