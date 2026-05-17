let ioInstance;

const onlineUsers = {};

const socketHandler = (io) => {

  ioInstance = io;

  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    // USER JOIN
    socket.on("join", (userId) => {

      onlineUsers[userId] = socket.id;

      console.log("Online Users:", onlineUsers);
    });

    // DISCONNECT
    socket.on("disconnect", () => {

      for (const userId in onlineUsers) {

        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }

      console.log("User Disconnected:", socket.id);
    });

  });

};

const getIO = () => ioInstance;

module.exports = {
  socketHandler,
  onlineUsers,
  getIO,
};

