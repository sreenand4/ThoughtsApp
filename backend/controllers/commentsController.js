const Comment = require('../models/CommentModel');

const commentOnThought = async (req, res) => {
    const { authorId, authorUsername, content, parentThoughtId } = req.body;
    try {
        const comment = await Comment.create({
            parentThoughtId: parentThoughtId,
            authorId: authorId,
            authorUsername: authorUsername,
            content: content,
            likeCount: 0,
        });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCommentsByParentThoughtId = async (req, res) => {
    const { parentThoughtId } = req.params;
    try {
        const comments = await Comment.find({ parentThoughtId: parentThoughtId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { commentOnThought, getCommentsByParentThoughtId };
