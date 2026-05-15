const db = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";

    db.query(
      sql,
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        const token = generateToken(result.insertId);

        res.status(201).json({
          id: result.insertId,
          name,
          email,
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
};