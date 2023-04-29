const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("a user connected!");
  socket.broadcast.emit("user-connected", "A user has joined the chat!");
  socket.on("chat-message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat-message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
