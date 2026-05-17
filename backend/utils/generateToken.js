const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log("user token param");
  console.log(user.id);
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;
