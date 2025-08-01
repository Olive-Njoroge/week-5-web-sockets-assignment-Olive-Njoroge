const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    socketId: {type: String},
    isOnline: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);


// The socketId in your schema is used to uniquely identify a user's connection through WebSockets (usually via Socket.IO). Its main purpose is to manage real-time communication between clients and the server.

// 🔍 What is socketId?
// It’s a unique identifier automatically generated by Socket.IO for each connected client.