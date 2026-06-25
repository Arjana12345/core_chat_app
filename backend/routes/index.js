const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const messageRoutes = require("./messageRoutes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/messages", messageRoutes);

module.exports = router;
