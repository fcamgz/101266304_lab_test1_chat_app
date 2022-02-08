const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("welcome", "hello welcome to this server");

  socket.on("join", (room, username) => {
    socket.join(room);
    console.log("joined " + room, username);
  });

  socket.on("send group message", (message, roomName, username) => {
    console.log(roomName, message, username);
    socket
      .to(roomName)
      .emit("receive message", { message: message, username: username });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.join("covid19");
  socket.join("nodeJS");
});
