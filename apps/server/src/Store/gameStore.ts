import { Game } from "../game/Game";

type GameMap = Record<string, Game>;

class GameStore {
  private games: GameMap = {};

  addGame(game: Game) {
    this.games[game.id] = game;
  }

  getGame(gameId: string): Game | undefined {
    if (typeof gameId !== "string") {
      throw new Error("gameId should be a string");
    }
    return this.games[gameId];
  }

  removeGame(gameId: string) {
    if (typeof gameId !== "string") {
      throw new Error("gameId should be a string");
    }
    delete this.games[gameId];
  }

  getAllGames(): GameMap {
    return this.games;
  }
}

export const gameStore = new GameStore();
