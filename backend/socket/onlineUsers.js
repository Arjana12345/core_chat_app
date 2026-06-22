const onlineUsers = new Map();

const addUser = (userId, socketId) => {
  onlineUsers.set(userId, socketId);
};

const removeUser = (socketId) => {
  for (const [userId, id] of onlineUsers) {
    if (id === socketId) {
      onlineUsers.delete(userId);
    }
  }
};

const getSocketId = (userId) => {
  return onlineUsers.get(userId);
};

module.exports = {
  addUser,
  removeUser,
  getSocketId,
};
