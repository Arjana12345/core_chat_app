const {
  createMessage,
  getMessages,
} = require("../repositories/messageRepository");

const sendMessage = async ({ senderId, receiverId, message }) => {
  const id = await createMessage(senderId, receiverId, message);

  return {
    id,
    sender_id: senderId,
    receiver_id: receiverId,
    message,
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
