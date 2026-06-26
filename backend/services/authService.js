const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { AppError } = require("../utils/AppError");

const {
  createUser,
  findUserByEmail,
} = require("../repositories/authRepository");

const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await createUser(name, email, hashedPassword);

  if (!userId) {
    throw new AppError("User not created", 404);
  }
  const token = generateToken({
    id: userId,
    role: "user",
  });

  return { id: userId, name, email, token };
};

const login = async ({ email, password }) => {
  console.log("login called with email:", email, "and password:", password);

  const user = await findUserByEmail(email);

  console.log(user);
  if (!user) {
    throw new AppError("User not found with the provided email", 404);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new AppError("Invalid Email or Password does not match", 401);
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

module.exports = {
  register,
  login,
};
