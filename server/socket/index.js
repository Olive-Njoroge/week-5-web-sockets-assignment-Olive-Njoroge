const Message = require('../models/Message');
const User = require('../models/User');

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    // Join a chat room
    socket.on("joinRoom", async ({ username, roomId }) => {
      const user = await User.findOneAndUpdate(
        { username },
        { socketId: socket.id, isOnline: true },
        { new: true }
      );

      socket.join(roomId);
      io.to(roomId).emit("userJoined", { user, roomId });

      // User typing
      socket.on("typing", () => {
        socket.to(roomId).emit("typing", username);
      });

      socket.on("stopTyping", () => {
        socket.to(roomId).emit("stopTyping", username); // ✅ fixed
      });

      // Send message
      socket.on("sendMessage", async (data) => {
        const message = await Message.create({
          sender: user._id,
          room: roomId,
          content: data,
        });

        const fullMessage = await message.populate("sender", "username"); // ✅ populate the message
        io.to(roomId).emit("newMessage", fullMessage);
      });

      // Handle disconnect
      socket.on("disconnect", async () => {
        const offlineUser = await User.findOneAndUpdate(
          { socketId: socket.id },
          { isOnline: false },
          { new: true }
        );

        if (offlineUser) {
          io.emit("userOffline", offlineUser.username);
        }
      });
    });
  });
};

module.exports = handleSocketConnection;
