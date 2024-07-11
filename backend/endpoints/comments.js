const express = require('express');
const Comment = require('../models/CommentModel');
const commentOnThought = require('../controllers/commentsController')

const router = express.Router();

// POST a thoguht 
router.post('/commentOnThought/:thoughtId', (req, res) => {
    const { thoughtId } = req.params;
    console.log('Received thoughtId:', thoughtId);
    try {
        res.status(200).json({ thoughtId });
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
});

module.exports = router;