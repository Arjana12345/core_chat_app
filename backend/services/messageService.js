const { AppError } = require("../utils/AppError");
const {
  createMessage,
  getMessages,
} = require("../repositories/messageRepository");

const sendMessage = async ({ senderId, receiverId, message }) => {
  const id = await createMessage(senderId, receiverId, message);

  console.log("Message created with ID:", id);

  if (!id) {
    throw new AppError("Message not created", 404);
  }

  return {
    id,
    sender_id: senderId,
    receiver_id: receiverId,
    message,
    status: "delivered",
  };
};

const fetchMessages = async ({ userId, otherUserId, limit, lastId }) => {
  const messages = await getMessages(userId, otherUserId, limit, lastId);
  if (!messages) {
    throw new AppError("Messages not found", 404);
  }

  return messages;
};

module.exports = {
  sendMessage,
  fetchMessages,
};
