const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

const registerUser = async (req, res) => {
  const result = await authService.register(req.body);

  res.status(201).json(result);
};

const loginUser = async (req, res) => {
  const result = await authService.login(req.body);

  res.json(result);
};

module.exports = {
  registerUser,
  loginUser,
};
