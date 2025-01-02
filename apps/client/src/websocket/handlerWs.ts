import { wsMessageFromServer } from "@packages/ws-message-types/dist";
import { Game } from "../game";
import { createWS } from "./createWs";
import { ClientPlayer } from "../game/models/player";

export const handlerWs = async (
  game: Game,
  wsCliet: Awaited<ReturnType<typeof createWS>>
) => {
  wsCliet.onMessage((message: wsMessageFromServer) => {
    switch (message.type) {
      case "game-environment":
        {
          game.setGameEnv(message.data.gameEnv);
        }
        break;
      case "players":
        {
          const me = ClientPlayer.deserialize(message.data.you);
          game.setMe(me);
          const others = message.data.others.map((serializePlayer) =>
            ClientPlayer.deserialize(serializePlayer)
          );
          game.setOtherPlayer(others);
        }
        break;
      case "Game-start":
        game.start();
        break;
      case "playersUpdateLocaion":
        game.playerUpdateState(message.data.players);
        break;
      default:
        break;
    }
  });
};
