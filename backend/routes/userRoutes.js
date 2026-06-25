const express = require("express");

const {
  getCurrentUser,
  getAllUsers,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/profile", protect, getCurrentUser);
//  example for admin only middleware
router.get("/all-users", protect, adminOnly, (req, res) => {
  res.send("Admin Route Accessed");
});

router.get("/all", protect, getAllUsers);

module.exports = router;
