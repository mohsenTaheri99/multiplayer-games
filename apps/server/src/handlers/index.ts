import WebSocket from "ws";
import { wsMessageFromClient } from "ws-message-types";
import { craeteGame } from "./createGame";
import { joinGame } from "./joinGame";
export const handler = (
  message: wsMessageFromClient,
  connection: WebSocket
) => {
  switch (message.type) {
    case "create-game":
      craeteGame(message, connection);
      break;
    case "join-game":
      joinGame(message, connection);
      break;
  }
};
