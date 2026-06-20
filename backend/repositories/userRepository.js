const db = require("../config/db");

const getCurrentUser = async (userId) => {
  console.log("getCurrentUser called with userId:", userId);
  const [rows] = await db.query(
    ` SELECT id, name, email, role FROM users WHERE id = ?`,
    [userId],
  );

  return rows[0];
};

const getAllUsers = async (userId) => {
  const [rows] = await db.query(
    `SELECT id, name, email FROM users WHERE id != ?`,
    [userId],
  );
  return rows;
};

module.exports = {
  getCurrentUser,
  getAllUsers,
};
