const Comment = require('../models/CommentModel');

// POST a comment on a thought
const commentOnThought = async (req, res) => {
    const { parentThoughtId, authorId, authorUsername, content, likeCount } = req.body;
    try {
        const comment = await Comment.create({
            authorId: authorId,
            authorUsername: authorUsername,
            parentThoughtId: parentThoughtId,
            content: content,
            likeCount: likeCount,
        });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET comments on a thoguht
const getCommentsByParentThoughtId = async (req, res) => {
    const { parentThoughtId } = req.params;
    try {
        const comments = await Comment.find({ parentThoughtId: parentThoughtId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET a replies on a comment
const getRepliesByParentCommentId = async (req, res) => {
    const { parentCommentId } = req.params;
    try {
        const replies = await Comment.find({ parentCommentId: parentCommentId });
        res.status(200).json(replies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// POST a reply to a comment
const replyToComment = async (req, res) => {
    const { authorId, authorUsername, parentCommentId, content, likeCount } = req.body;
    try {
        // Create the reply
        const reply = await Comment.create({
            authorId: authorId,
            authorUsername: authorUsername,
            parentCommentId: parentCommentId,
            content: content,
            likeCount: likeCount,
        });

        // Find the parent comment
        const parentComment = await Comment.findById(parentCommentId);
        if (!parentComment) {
            return res.status(404).json({ error: 'Parent comment not found' });
        }

        // Update the parent comment's replies array
        parentComment.replies.push(reply._id);
        await parentComment.save();

        res.status(200).json(reply); // Return the created reply
    } catch (err) {
        console.error('Error posting reply:', err);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { commentOnThought, getCommentsByParentThoughtId, replyToComment, getRepliesByParentCommentId };
