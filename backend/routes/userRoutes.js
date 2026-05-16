const express = require("express");

const {
  getCurrentUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


const router = express.Router();

router.get("/profile", protect, getCurrentUser);
router.get("/all-users",protect,adminOnly,(req, res) => {
                                                res.send("Admin Route Accessed");
                                              }
                                            );

module.exports = router;



