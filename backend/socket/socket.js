const jwt = require("jsonwebtoken");

const { createMessage, sendMessage } = require("../services/messageService");

let ioInstance;

const onlineUsers = {};

const socketHandler = (io) => {
  ioInstance = io;

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new AppError("Token missing", 401));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = decoded;

      next();
    } catch (error) {
      next(new AppError("Invalid token", 401));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    const userId = socket.user.id;

    onlineUsers[String(userId)] = socket.id;

    console.log("Online users:", onlineUsers);

    socket.on("sendMessage", async (data) => {
      try {
        const senderId = socket.user.id;

        const savedMessage = await sendMessage({
          senderId,

          receiverId: data.receiver_id,

          message: data.message,
        });

        console.log("Saved message:", savedMessage);

        const receiverSocket = onlineUsers[String(data.receiver_id)];
        console.log("Receiver socket:", receiverSocket);

        if (receiverSocket) {
          console.log("Sending message to receiver:", receiverSocket);
          io.to(receiverSocket).emit("receiveMessage", savedMessage);
        }

        socket.emit("messageSent", savedMessage);
      } catch (error) {
        console.log("Socket message error", error);
      }
    });
    socket.on("disconnect", () => {
      delete onlineUsers[String(userId)];

      console.log("User disconnected", userId);
    });
  });
};

const getIO = () => ioInstance;

module.exports = {
  socketHandler,
  onlineUsers,
  getIO,
};
