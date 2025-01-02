import { ServerPlayer } from "../models/Player";
import { collisionDetection, GameEnvironment, GameObject } from "game-entities";

interface GameOptions {
  name: string;
  id: string;
  gameEnv: GameEnvironment;
}
export class Game {
  private _id: string;
  private _name: string;
  private _players: ServerPlayer[] = [];
  private lastUpdate: number = 0;
  gameEnv: GameEnvironment;
  private floors: GameObject[] = [];
  playerInGame: number = 0;

  constructor(options: GameOptions) {
    this._id = options.id;
    this._name = options.name;
    this.gameEnv = options.gameEnv;
    this.floors = this.gameEnv.serializeFloors.map((sf) =>
      GameObject.deserialize(sf)
    );
  }

  addNewPlayer(player: ServerPlayer) {
    player.position = this.gameEnv.spawnPositions[this.playerInGame];
    this._players.push(player);
    this.playerInGame++;
    player.send({
      type: "game-environment",
      data: {
        gameEnv: this.gameEnv,
      },
    });
    if (this.playerInGame === 2) this.startGame();
  }

  startGame() {
    this._players.forEach((player) => {
      player.send({
        type: "players",
        data: {
          you: player.serialize(),
          others: this._players
            .filter((p) => p !== player)
            .map((p) => p.serialize()),
        },
      });
      player.send({
        type: "Game-start",
        data: {},
      });
    });
    this.lastUpdate = Date.now();
    setInterval(() => {
      this.gameLoop();
    }, 50);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }

  gameLoop() {
    const curentDate = Date.now();
    const deltaTime = (curentDate - this.lastUpdate) / 1000;
    console.clear();
    this.lastUpdate = curentDate;
    this._players.forEach((player) => {
      player.velacityY = player.velacity.y + this.gameEnv.gravity * deltaTime;
      player.update(deltaTime);
      this.floors.forEach((f) => {
        const direction = collisionDetection(player, f);
        player.handleCallision(direction, f);
      });
    });
    this._players.forEach((player) => {
      player.send({
        type: "playersUpdateLocaion",
        data: {
          players: this._players.map((p) => {
            return {
              time: Date.now(),
              id: p.id,
              velacity: p.velacity,
              position: p.position,
            };
          }),
        },
      });
    });
  }
}
