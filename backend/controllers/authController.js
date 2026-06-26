const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");
const asyncHandler = require("../middleware/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.status(201).json(result);
});

const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.status(200).json(result);
});

module.exports = {
  registerUser,
  loginUser,
};
