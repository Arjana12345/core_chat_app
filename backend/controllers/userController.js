const userService = require("../services/userService");

const getCurrentUser = async (req, res) => {
  const result = await userService.getCurrentUser(req.user.id);

  res.status(201).json(result);
};

const getAllUsers = async (req, res) => {
  console.log("getAllUsers called with body:", req.user);
  const result = await userService.getUsers(req.user.id);

  res.status(201).json(result);
};

module.exports = {
  getCurrentUser,
  getAllUsers,
};
