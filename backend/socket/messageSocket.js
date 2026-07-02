const { AppError } = require("../utils/AppError");
const { getSocketId } = require("./onlineUsers");
const { createMessage, sendMessage } = require("../services/messageService");

const messageSocket = (io, socket) => {
  socket.on("sendMessage", async (messageData) => {
    try {
      const senderId = socket.user.id;

      const savedMessage = await sendMessage({
        senderId,

        receiverId: messageData.receiver_id,

        message: messageData.message,
      });

      // console.log("Saved message:", savedMessage);

      const receiverSocket = getSocketId(savedMessage.receiver_id);
      // console.log("Receiver socket:", receiverSocket);

      if (receiverSocket) {
        // console.log("Sending message to receiver:", receiverSocket);
        io.to(receiverSocket).emit("receiveMessage", savedMessage);
      }

      socket.emit("messageSent", savedMessage);
    } catch (error) {
      console.log("Socket message error", error);
      throw new AppError("Socket message error", 404);
    }
  });
};

module.exports = messageSocket;
