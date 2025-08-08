import WebSocket from "ws";
import { WebSocketMessage } from "./types/playloads";
import { gameEndhandler, gameStartHandler, joinGameHandler } from "./handler";

export const handleMessage = (
  connection: WebSocket,
  payload: WebSocketMessage
) => {
  switch (payload.type) {
    case "game_start":
      gameStartHandler(connection, payload.data);
      break;

    case "join-game":
      joinGameHandler(connection, payload.data);
      break;

    case "game_end":
      gameEndhandler(connection, payload.data);
      break;
  }
};
