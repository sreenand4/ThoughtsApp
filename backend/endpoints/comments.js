const express = require('express');
const Comment = require('../models/CommentModel');
const { commentOnThought, getCommentsByParentThoughtId, replyToComment, getRepliesByParentCommentId } = require('../controllers/commentsController')

const router = express.Router();

// POST a thoguht 
router.post('/commentOnThought', commentOnThought);

// GET comments for a specific thought
router.get('/commentsOnThought/:parentThoughtId', getCommentsByParentThoughtId);

// GET replies for a specific comment 
router.get('/repliesOnComment/:parentCommentId', getRepliesByParentCommentId);

//POST a reply
router.post('/replyToComment', replyToComment);

module.exports = router;