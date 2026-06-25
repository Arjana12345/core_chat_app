const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const { socketHandler } = require("./socket/socket");

const app = express();
const routes = require("./routes");

app.use(cors());
/*
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
*/

app.use(express.json());

// routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Core Chat API Running");
});

/*
app.get("/test", async (req, res) => {
  const db = require("./config/db");
  const [rows] = await db.query("SELECT * FROM users");

  console.log(rows);

  res.json(rows);
});
*/

// create http server

const server = http.createServer(app);

// socket server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// initialize socket

socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
