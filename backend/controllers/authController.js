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
          console.log("not registered");
          console.log(err);
          return res.status(500).json(err);
        }

        console.log("user registered");
                
        const token = generateToken({ id: result.insertId, role: "user" });

        res.status(201).json({
          id: result.insertId,
          name,
          email,
          token,
        });
      }
    );
  } catch (error) {
    console.log("server error");
    console.log(err);
    res.status(500).json(error);
  }
};


const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid Email or Password",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Email or Password",
        });
      }

      let token_data = { id: user.id, role: user.role };
      const token = generateToken(token_data);

      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {
  registerUser,
  loginUser
};