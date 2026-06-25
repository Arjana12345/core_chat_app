const { onlineUsers, getIO } = require("../socket/socket");
const messageService = require("../services/messageService");

const sendMessage = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request user:", req.user);
  const senderId = req.user.id;

  const { receiverId, message } = req.body;
  console.log("message=", message);
  console.log("receiverId=", receiverId);
  const result = await messageService.sendMessage({
    senderId,
    receiverId,
    message,
  });

  // sending only receiver user
  const receiverSocketId = onlineUsers[receiverId];
  console.log("Receiver Socket:", receiverSocketId);

  if (receiverSocketId) {
    console.log("Running receiver socket ");
    const io = getIO();

    io.to(receiverSocketId).emit("receiveMessage", {
      ...result,
      status: "delivered",
    });
  }

  console.log("Message sent");
  res.status(201).json({
    message_status: 201,
    messageId: result.id,
  });
};

const getMessages = async (req, res) => {
  const senderId = req.user.id;
  const receiverId = Number(req.params.receiverId);
  const lastId = Number(req.query.lastId);
  const limit = Number(req.query.limit) || 20;

  console.log("sender_id =", senderId);
  console.log("receiver_id =", receiverId);
  console.log("lastId =", lastId);
  console.log("limit =", limit);

  const messages = await messageService.fetchMessages({
    userId: senderId,
    otherUserId: receiverId,
    limit,
    lastId,
  });

  res.status(200).json(messages);
};

module.exports = {
  sendMessage,
  getMessages,
};
