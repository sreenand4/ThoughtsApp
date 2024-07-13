const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    authorUsername: {
        type: String,
        required: true
    },
    parentThoughtId: {
        type: String,
        default: null
    },
    parentCommentId: {
        type: String,
        default: null
    },
    content: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
