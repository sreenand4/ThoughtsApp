const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThoughtSchema = new Schema({
    authorId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    content: {
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
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }, // list the longitude first, and then latitude.
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

ThoughtSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Thought", ThoughtSchema);