const db = require("../config/db");

const findUserById = async (userId) => {
  // console.log("called with userId:", userId);
  const [rows] = await db.query(
    ` SELECT id, name, email, role FROM users WHERE id = ?`,
    [userId],
  );

  return rows[0];
};

const findAllUsersExcept = async (userId) => {
  const [rows] = await db.query(
    `SELECT id, name, email FROM users WHERE id != ?`,
    [userId],
  );
  // console.log("findAllUsersExcept result:", rows);
  return rows;
};

module.exports = {
  findUserById,
  findAllUsersExcept,
};
