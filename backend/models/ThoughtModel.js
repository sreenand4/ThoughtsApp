const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThoughtSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    parked: {
        type: Boolean,
        required: true
    },
    coordinates: {
        type: String
    },
    expireAt: {
        type: Date,
        required: true
    },
    likeCount: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model("Thought", ThoughtSchema);