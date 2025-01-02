import WebSocket from "ws";
import { CraeteGamePayload } from "ws-message-types";
import { Game } from "../game/Game";
import { gameStore } from "../Store/gameStore";
import logger from "../utility/logger";
import { ServerPlayer } from "../models/Player";

import path from "path";
import { readGameData } from "../utility/readGameData";
import { GameEnvironment } from "game-entities";

export const craeteGame = async (
  message: CraeteGamePayload,
  connection: WebSocket
) => {
  const serializePlayer = await readGameData(
    path.join("map1", "player", "player.json")
  );
  const envData = await readGameData<GameEnvironment>(
    path.join("map1", "map1.json")
  );
  const data = message.data;
  const game = new Game({
    id: data.gameId,
    name: data.gameName,
    gameEnv: envData,
  });
  gameStore.addGame(game);
  logger.info(`a game created id : ${game.id}`);
  const player = ServerPlayer.deserialize(serializePlayer);
  player.connection = connection;
  game.addNewPlayer(player);
};
