const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const socketHandler = require("./socket/socket");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  console.log("Core Chat API Running");
  res.send("Core Chat API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


