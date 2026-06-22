const {
  createMessage,
  getMessages,
} = require("../repositories/messageRepository");

const sendMessage = async ({ senderId, receiverId, message }) => {
  const id = await createMessage(senderId, receiverId, message);

  console.log("Message created with ID:", id);
  return {
    id,
    sender_id: senderId,
    receiver_id: receiverId,
    message,
    status: "delivered",
  };
};

const fetchMessages = async ({ userId, otherUserId, page, limit }) => {
  const offset = (page - 1) * limit;

  return await getMessages(userId, otherUserId, limit, offset);
};

module.exports = {
  sendMessage,
  fetchMessages,
};
