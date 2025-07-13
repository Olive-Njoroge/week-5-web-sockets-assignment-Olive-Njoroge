const Message = require('../models/Message');
const User = require('../models/User');

const handleSocketConnection = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected", socket.id);

        //Socket for joining a room
        socket.on("joinRoom", async ({username, roomId}) => {
            const user = await User.findOneAndUpdate(
                {username},
                {socketId: socket.id, isOnline: true},
                {new: true}
            );

            socket.join(roomId);
            io.to(roomId).emit("userJoined", {user, roomId});

            //Typing
            socket.on("typing", () => {
                socket.to(roomId).emit("typing", username);
            });

            socket.on("stopTyping", () => {
                socket.on(roomId).emit("stopTyping", username);
            });

            //Send Message
            socket.on("sendMessage", async (data) => {
                const message = await message.create({
                    sender: user._id,
                    room: roomId,
                    content: data
                });
                const fullMessage = await Message.populate("sender", "username");
                io.to(roomId).emit("newMessage", fullMessage);
            });

            //Disconnect
            socket.on("disconnect", async () => {
                const offlineUser = await User.findOneAndUpdate({socketId: socket.id, isOnline: false});
                io.emit("userOffline", offlineUser.username)
            });

        });
    });
};

module.exports = handleSocketConnection;

// 🔹 This sets up a listener for when any client connects
// socket represents the connected client

// socket.id is the unique identifier for that connection