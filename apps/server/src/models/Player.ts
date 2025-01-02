import { GameObjectOptions, Player } from "game-entities";
import WebSocket from "ws";
import { wsMessageFromClient, wsMessageFromServer } from "ws-message-types";

export class ServerPlayer extends Player {
  private _connection: WebSocket | null = null;
  constructor(options: GameObjectOptions) {
    super(options);
  }

  set connection(connection: WebSocket) {
    this._connection = connection;

    this.onMessage((message) => {
      switch (message.type) {
        case "player-input":
          const latency = (Date.now() - message.data.time) / 1000;
          if (message.data.input === "left") {
            this.moveleft();
            this.x = this.position.x + this.velacity.x * latency;
          }
          if (message.data.input === "right") {
            this.moveRight();
            this.x = this.position.x + this.velacity.x * latency;
          }
          if (message.data.input === "stop") {
            this.stopSideMove();
            this.velacityX = 0;
          }
          if (message.data.input === "jump") {
            this.jump();
            this.y = this.y + this.velacity.y * latency;
          }
          break;
        default:
          break;
      }
    });
  }

  send(payload: wsMessageFromServer) {
    if (!this._connection) throw new Error("Connection does not exist.");
    this._connection.send(JSON.stringify(payload));
  }
  onMessage(callback: (message: wsMessageFromClient) => void) {
    if (!this._connection) throw new Error("Connection does not exist.");
    this._connection.on("message", (jsonMsg) => {
      const message = jsonMsg.toString();
      callback(JSON.parse(message));
    });
  }
}
