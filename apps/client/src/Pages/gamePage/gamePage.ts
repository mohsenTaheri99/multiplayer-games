import { CanvasContoller } from "../../CanvasContoller";
import { Game } from "../../game";
import { State } from "../../state";
import { createWS, handlerWs } from "../../websocket";
export const renderGame = async (app: HTMLDivElement, state: State) => {
  const canvasController = new CanvasContoller(app);

  const wsCliet = await createWS("ws://localhost:3000");
  const game = new Game(canvasController, wsCliet);
  handlerWs(game, wsCliet);
  const gameId = state.getGameId();
  if (gameId) {
    wsCliet.send({
      type: "join-game",
      data: {
        playerId: "mohsen",
        gameId: gameId,
      },
    });
  } else {
    wsCliet.send({
      type: "create-game",
      data: {
        playerId: "mohsen",
        gameName: state.getGameName(),
        gameId: "llm",
      },
    });
  }
};
