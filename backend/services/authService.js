// const bcrypt = require("bcryptjs");

// const {
//   createUser,
//   findUserByEmail,
// } = require("../repositories/authRepository");

// const register = async (data) => {
//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   const id = await createUser(data.name, data.email, hashedPassword);

//   return id;
// };

// module.exports = {
//   register,
// };

const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const {
  createUser,
  findUserByEmail,
} = require("../repositories/authRepository");

const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await createUser(name, email, hashedPassword);

  const token = generateToken({
    id: userId,
    role: "user",
  });

  return { id: userId, name, email, token };
};

/*
const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid Email or Password");
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
*/

const login = async ({ email, password }) => {
  console.log("login called with email:", email, "and password:", password);

  const user = await findUserByEmail(email);

  console.log(user);
  if (!user) {
    throw new Error("User not found with the provided email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid Email or Password does not match");
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
