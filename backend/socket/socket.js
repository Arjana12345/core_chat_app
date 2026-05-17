const jwt = require("jsonwebtoken");
let ioInstance;

const onlineUsers = {};

const socketHandler = (io) => {

  ioInstance = io;

  // socket middleware

  io.use((socket, next) => {

    try {

      const token =
        socket.handshake.auth.token;

      if (!token) {
        return next(
          new Error("Authentication Error")
        );
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      socket.user = decoded;

      next();

    } catch (error) {

      next(
        new Error("Invalid Token")
      );
    }
  });


  // socket connection
  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    // USER JOIN

    const userId = socket.user.id;

    onlineUsers[userId] = socket.id;

    console.log("Online Users:", onlineUsers);



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

