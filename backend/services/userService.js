const {
  findUserById,
  findAllUsersExcept,
} = require("../repositories/userRepository");

const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const getUsers = async (userId) => {
  console.log("getUsers called with userId:", userId);
  return await findAllUsersExcept(userId);
};

module.exports = {
  getCurrentUser,
  getUsers,
};
