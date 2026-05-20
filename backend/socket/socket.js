const jwt = require("jsonwebtoken");
let ioInstance;

const onlineUsers = {};

const socketHandler = (io) => {

  ioInstance = io;

  // socket middleware

  io.use((socket, next) => {

    try {

      const token = socket.handshake.auth.token;

      if (!token) {
        return next(
          new Error("Authentication Error")
        );
      }
      console.log("Socket Trying To Connect");
      const decoded = jwt.verify(
                                token,
                                process.env.JWT_SECRET
                              );
      console.log(decoded);
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

    console.log("socket connection running");
    
    console.log(socket.user);

    const userId = socket.user.id;

    onlineUsers[userId] = socket.id;

    
    console.log("Online Users:", onlineUsers);

    // Disconnect user
    socket.on("disconnect", () => {

      delete onlineUsers[userId];

      console.log("User Disconnected:", userId);
    });
  });



};

const getIO = () => ioInstance;

module.exports = {
  socketHandler,
  onlineUsers,
  getIO,
};

