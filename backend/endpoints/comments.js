const express = require('express');
const Comment = require('../models/CommentModel');
const { commentOnThought, getCommentsByParentThoughtId } = require('../controllers/commentsController')

const router = express.Router();

// POST a thoguht 
router.post('/commentOnThought', commentOnThought);
router.get('/commentsOnThought/:parentThoughtId', getCommentsByParentThoughtId);

module.exports = router;