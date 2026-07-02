const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const { socketHandler } = require("./socket/socket");

const app = express();
const routes = require("./routes");
const errorMiddleware = require("./middleware/errorMiddleware");

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

// routes
app.use("/api", routes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Core Chat API Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "Backend running",
    time: new Date(),
  });
});

// create http server

const server = http.createServer(app);

// socket server

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// initialize socket

socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
