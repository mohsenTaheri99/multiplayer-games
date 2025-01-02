import { GameObjectOptions, Player } from "game-entities";

export class ClientPlayer extends Player {
  animCurrentFrame: number = 0;
  animLastFrameChenge: number = 0;
  currentAnimation: number = 1;

  constructor(option: GameObjectOptions) {
    super(option);
  }
}
