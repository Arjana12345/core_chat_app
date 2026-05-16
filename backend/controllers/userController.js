const db = require("../config/db");

const getCurrentUser = (req, res) => {
  try {
    const sql = "SELECT id, name, email, role FROM users WHERE id = ?";

    db.query(sql, [req.user.id], (err, result) => {
      if (err) {
        console.log("Error- while running sql for select user");
        console.log(err);
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        console.log("user not found");
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log("user found");
      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.log("server error");
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getCurrentUser,
};
