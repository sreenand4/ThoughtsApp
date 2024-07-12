// import
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const thoughtsEndpoints = require('./endpoints/thoughts');
const usersEndpoints = require('./endpoints/users');
const commentsEndpoints = require('./endpoints/comments')

// create server
const server = express();

// middleware
server.use(express.json());

server.use((req, res, next) => {
    console.log("path:", req.path, "method:", req.method);
    next();
})

// expose endpoints
server.use('/endpoints/thoughts', thoughtsEndpoints);
server.use('/endpoints/users', usersEndpoints);
server.use('/endpoints/comments', commentsEndpoints);

// connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    // listen on a specific port
    server.listen(process.env.PORT, () => {
        console.log("sucessfully connected to mongo, and listening on port", process.env.PORT);
    })
}).catch((error) => {
    console.log(error)
})