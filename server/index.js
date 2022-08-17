import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"


const app = express();
app.use(cors())
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
 });

io.on("connection", (socket) => {
  console.log(`ID: ${socket.id}`)

  socket.on("send-message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive-message", data)
    // io.emit("receive-message", data)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

httpServer.listen(3002, () => {
  console.log("SERVER IS RUNNING")
});
