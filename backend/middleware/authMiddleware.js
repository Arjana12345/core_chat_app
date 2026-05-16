
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log(req.url);
  let token;

  const authHeader = req.headers.authorization;

  if (
    authHeader &&
    authHeader.startsWith("Bearer")
  ) {
    try {
      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;
      console.log("user details: ", req.user);
      next();
    } catch (error) {
        console.log("token not verified");
        console.log(error);
        return res.status(401).json({
            message: "Invalid Token",
        });
    }
  }

  if (!token) {
    console.log("Token not found, token:", token);
    return res.status(401).json({
      message: "No Token Provided",
    });
  }
};

module.exports = protect;
