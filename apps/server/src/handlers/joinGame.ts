import { joinGamePayload } from "ws-message-types";
import { gameStore } from "../Store/gameStore";
import WebSocket from "ws";
import logger from "../utility/logger";
import { ServerPlayer } from "../models/Player";
import path from "path";
import { readGameData } from "../utility/readGameData";
export const joinGame = async (
  message: joinGamePayload,
  connection: WebSocket
) => {
  const data = message.data;
  const game = gameStore.getGame(data.gameId);
  if (!game) {
    logger.warn(
      `Attempted to join a non-existent game with gameId: ${data.gameId}`
    );
    return;
  }
  const serializePlayer = await readGameData(
    path.join("map1", "player", "player.json")
  );
  const player = ServerPlayer.deserialize(serializePlayer);
  player.connection = connection;

  game.addNewPlayer(player);
};
