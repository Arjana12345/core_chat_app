const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); 
const { socketHandler } = require("./socket/socket");

dotenv.config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const messageRoutes = require("./routes/messageRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  console.log("Core Chat API Running");
  res.send("Core Chat API Running");
});




const server =  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

const PORT =  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});
