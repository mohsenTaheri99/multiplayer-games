import express from "express";
import http from "http";
import WebSocket from "ws";
import cors from "cors";
import logger from "./utility/logger";
import { handler } from "./handlers";
import { gameStore } from "./Store/gameStore";
const app = express();
const server = http.createServer(app);
const PORT = 3000;
const ws = new WebSocket.Server({ server });
// Express Route
app.use(cors());
app.get("/", (req, res) => {
  res.send("Socket.IO Server is running!");
});

app.get("/game-rooms", (req, res) => {
  const gamelist: { id: string; name: string }[] = [];
  const games = gameStore.getAllGames();
  for (const key in games) {
    gamelist.push({
      name: games[key].name,
      id: games[key].id,
    });
  }
  res.send(JSON.stringify(gamelist));
});

ws.on("connection", (connection) => {
  console.log("New WebSocket connection");

  connection.on("message", (msg: string) => {
    const message = JSON.parse(msg);
    handler(message, connection);
  });

  connection.on("close", () => {
    logger.info("WebSocket connection closed");
  });
});
// Start the server
server.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
