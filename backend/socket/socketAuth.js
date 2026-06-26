const { AppError } = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new AppError("Token missing", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = decoded;

    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};

module.exports = socketAuth;
