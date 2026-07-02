const socketAuth = require("./socketAuth");

const { addUser, removeUser, onlineUsers } = require("./onlineUsers");

const messageSocket = require("./messageSocket");

let ioInstance;

const socketHandler = (io) => {
  ioInstance = io;

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    const userId = socket.user.id;

    addUser(userId, socket.id);

    // console.log(onlineUsers);

    messageSocket(io, socket);

    socket.on("disconnect", () => {
      removeUser(userId);

      console.log("User disconnected", userId);
    });
  });
};

const getIO = () => {
  return ioInstance;
};

module.exports = {
  socketHandler,
  getIO,
};
