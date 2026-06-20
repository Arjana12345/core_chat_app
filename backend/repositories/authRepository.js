const db = require("../config/db");

const createUser = async (name, email, password) => {
  const [result] = await db.query(
    `
      INSERT INTO users
      (name,email,password)
      VALUES (?,?,?)
      `,
    [name, email, password],
  );

  return result.insertId;
};

const findUserByEmail = async (email) => {
  console.log("findUserByEmail called with email:", email);
  const [rows] = await db.query(
    `
      SELECT *
      FROM users
      WHERE email = ?
      `,
    [email],
  );

  console.log("findUserByEmail result:", rows);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
