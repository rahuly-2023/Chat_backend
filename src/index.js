"use strict";
const { Server } = require("socket.io"); // Use CommonJS syntax

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap(/*{ strapi }*/) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {

      socket.on("sendMessage", (data) => {
        data.type="received";
        // Emit the message back to the sender
        socket.emit("receiveMessage", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  },
};