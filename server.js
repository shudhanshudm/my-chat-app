const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000; // Use the port provided by Heroku or default to 5000

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("send name", (username) => {
    io.emit("send name", username);
  });

  socket.on("send message", (chat) => {
    io.emit("send message", chat);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening at the port: ${PORT}`);
});
