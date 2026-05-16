const onlineUsers = {};

const socketHandler = (io) => {

  io.on("connection", (socket) => {

    console.log("User Connected with socket id:", socket.id);

    // USER CONNECT EVENT
    socket.on("join", (userId) => {

      onlineUsers[userId] = socket.id;

      console.log("Online Users:", onlineUsers);
    });

    // DISCONNECT EVENT
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

module.exports = socketHandler;
