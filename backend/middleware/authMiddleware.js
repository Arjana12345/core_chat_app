const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protect = (req, res, next) => {
  console.log(req.url);
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      console.log("user details: ", req.user);
      next();
    } catch (error) {
      console.log("token not verified");
      console.log(error);
      throw new AppError("Invalid Token", 401);
    }
  }

  if (!token) {
    console.log("Token not found, token:", token);
    throw new AppError("Not authorized, Token missing", 401);
  }
};

module.exports = protect;
