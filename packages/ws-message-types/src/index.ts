import { GameEnvironment, GameObject } from "game-entities";

interface Payload {
  type: string;
  data: Record<string, any>;
}
//clinet to server
export interface CraeteGamePayload extends Payload {
  type: "create-game";
  data: {
    gameName: string;
    gameId: string;
    playerId: string;
  };
}

export interface joinGamePayload extends Payload {
  type: "join-game";
  data: {
    gameId: string;
    playerId: string;
  };
}

export interface PlayerMovePayload extends Payload {
  type: "player-input";
  data: {
    time: number;
    input: "left" | "stop" | "right" | "jump";
  };
}

/**
 * Represents messages sent from the client to the server.
 */
export type wsMessageFromClient =
  | CraeteGamePayload
  | joinGamePayload
  | PlayerMovePayload;
//------------------------------------------

//server to client
export interface GameEnvironmentPayload extends Payload {
  type: "game-environment";
  data: {
    gameEnv: GameEnvironment;
  };
}
export interface GameStartPayload extends Payload {
  type: "Game-start";
}
export interface PlayersInGamePayload extends Payload {
  type: "players";
  data: {
    you: ReturnType<GameObject["serialize"]>;
    others: ReturnType<GameObject["serialize"]>[];
  };
}
type playerPosi = {
  time: number;
  id: string;
  velacity: { x: number; y: number };
  position: { x: number; y: number };
};
export interface PlayersUpdateLocationMessage extends Payload {
  type: "playersUpdateLocaion";
  data: {
    players: playerPosi[];
  };
}
/**
 * Represents messages sent from the server to the client.
 */
export type wsMessageFromServer =
  | GameEnvironmentPayload
  | GameStartPayload
  | PlayersInGamePayload
  | PlayersUpdateLocationMessage;
