import {
  collisionDetection,
  GameEnvironment,
  GameObject,
  Player,
} from "game-entities";
import { CanvasContoller } from "../CanvasContoller";
import { AssetsLoader } from "../AssestLoader";
import { ClientPlayer } from "./models/player";
import { handleInputs } from "../handleInputs";
import { createWS } from "../websocket";
export class Game {
  private assets: Record<string, HTMLImageElement> = {};
  private canvasController: CanvasContoller;
  private floors: GameObject[] = [];
  private me: ClientPlayer | null = null;
  private otherPlayer: ClientPlayer[] | null = null;
  private gameEnvironment: GameEnvironment | null = null;
  private lastUpdate: number = 0;
  private wsClinet: Awaited<ReturnType<typeof createWS>>;
  constructor(
    canvasContoller: CanvasContoller,
    wsClinet: Awaited<ReturnType<typeof createWS>>
  ) {
    this.wsClinet = wsClinet;
    this.canvasController = canvasContoller;
  }

  /**
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  async update(deltaTime: number) {
    if (!this.gameEnvironment || !this.me)
      return console.log("me or gameEnv not exist!");
    this.canvasController.clearCanvas();
    this.canvasController.draw(
      this.assets[this.gameEnvironment.backGrundImage.url],
      { x: 0, y: 0 },
      { width: 500, height: 500 }
    );

    this.me.update(deltaTime);
    this.me.velacityY =
      this.me.velacity.y + this.gameEnvironment.gravity * deltaTime;
    this.floors.forEach((floor) => {
      if (this.me) {
        const direction = collisionDetection(this.me, floor);
        this.me.handleCallision(direction, floor);
      }
      this.canvasController.draw(
        this.assets[floor.animation[0].imgaeUrl],
        floor.position,
        floor.size
      );
    });

    this.animation(this.me, deltaTime);

    this.otherPlayer?.forEach((player) => {
      this.animation(player, deltaTime);
    });
  }

  start() {
    const loop = (currentTime: number) => {
      const deltaTime = (currentTime - this.lastUpdate) / 1000;
      this.lastUpdate = currentTime;
      this.update(deltaTime);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  async setGameEnv(env: GameEnvironment) {
    console.log(`we got env from server :  `, env);
    this.floors = env.serializeFloors.map((sf) => GameObject.deserialize(sf));
    const assetsLoader = new AssetsLoader(this.floors, env.backGrundImage.url);
    this.assets = await assetsLoader.load();
    this.gameEnvironment = env;
  }
  // get charter and load assets
  async setMe(Player: ClientPlayer) {
    const urls = Player.animation.map((p) => p.imgaeUrl);
    handleInputs(Player, this.wsClinet);
    urls.forEach(async (url) => {
      const image = await AssetsLoader.loadAnAsset(url);
      this.assets[url] = image;
    });
    this.me = Player;
  }
  async setOtherPlayer(otherPlayer: ClientPlayer[]) {
    otherPlayer.forEach(async (player) => {
      const urls = player.animation.map((p) => p.imgaeUrl);
      urls.forEach(async (url) => {
        const image = await AssetsLoader.loadAnAsset(url);
        this.assets[url] = image;
      });
    });
    this.otherPlayer = otherPlayer;
  }

  animation(cp: ClientPlayer, deltaTime: number) {
    const curentAnim = cp.currentAnimation;
    if (cp.animLastFrameChenge >= 0.1) {
      cp.animCurrentFrame =
        (cp.animCurrentFrame + 1) % cp.animation[curentAnim].frames;
      cp.animLastFrameChenge = 0;
    }
    this.canvasController.drowFrame(
      this.assets[cp.animation[curentAnim].imgaeUrl],
      cp.size,
      cp.position,
      cp.animation[curentAnim].framesSize,
      cp.animCurrentFrame,
      cp.animation[curentAnim].rows,
      cp.getForward()
    );
    cp.animLastFrameChenge += deltaTime;
  }

  playerUpdateState(states: playerPosi[]) {
    const cunrentTime = Date.now();
    states.forEach((ps) => {
      if (ps.id === this.me?.id) {
        if (Math.abs(this.me.x - ps.position.x) > 10) this.me.x = ps.position.x;
        if (Math.abs(this.me.y - ps.position.y) > 10) this.me.y = ps.position.y;
      } else {
        this.otherPlayer?.forEach((p) => {
          if (ps.id === p.id) {
            if (ps.velacity.x < 0) p.moveRight();
            if (ps.velacity.x > 0) p.moveleft();
            if (ps.velacity.x === 0) {
              p.stopSideMove();
              p.currentAnimation = 1;
            } else p.currentAnimation = 0;
            p.x =
              ps.position.x + ps.velacity.x * ((cunrentTime - ps.time) / 1000);
            p.y =
              ps.position.y + ps.velacity.y * ((cunrentTime - ps.time) / 1000);
          }
        });
      }
    });
  }
}

type playerPosi = {
  time: number;
  id: string;
  velacity: { x: number; y: number };
  position: { x: number; y: number };
};
