const Comment = require('../models/CommentModel');
const mongoose = require('mongoose')

const commentOnThought = async (req, res) => {
    const { thoughtId } = req.params;

    // const { authorId, authorUsername, content } = req.body;
    try {
        res.status(200).json(thoughtId);
        // const comment = await Comment.create({
        //     authorId: authorId,
        //     authorUsername: authorUsername,
        //     parentThoughtId: thoughtId,
        //     content: content,
        //     likeCount: 0,
        // });
        // res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = commentOnThought;
