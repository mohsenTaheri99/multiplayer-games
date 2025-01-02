import { GameObjectOptions } from "../types";
import { direction } from "./collistionDetection";
import { GameObject } from "./GameObject";

export class Player extends GameObject {
  private MaxHp: number = 100;
  private hp: number = 100;
  private movementSpeed = 100;
  private jumpPower = -100;
  private forward: "left" | "right" = "right";
  private isOnFloor: boolean = false;
  constructor(options: GameObjectOptions) {
    super(options);
  }

  getMomentSpeed() {
    return this.movementSpeed;
  }
  getHp() {
    return this.hp;
  }
  getMaxHp() {
    return this.MaxHp;
  }
  getJumpPower() {
    return this.jumpPower;
  }
  update(deltaTime: number) {
    this.x = this.x + this.velacity.x * deltaTime;
    this.y = this.y + this.velacity.y * deltaTime;
  }

  getForward() {
    return this.forward;
  }

  //input movent
  moveleft() {
    this.velacityX = -this.getMomentSpeed();
    this.forward = "left";
  }
  moveRight() {
    this.velacityX = this.getMomentSpeed();
    this.forward = "right";
  }
  stopSideMove() {
    this.velacityX = 0;
  }
  jump() {
    console.log("jump : ", this.velacity.y, this.isOnFloor);
    if (!this.isOnFloor) return;
    this.velacityY = this.jumpPower;
  }
  handleCallision(direction: direction | null, gameObj: GameObject) {
    this.isOnFloor = false;
    if (!direction) return;
    switch (direction) {
      case "bottom":
        this.y = gameObj.y - gameObj.size.height;
        this.velacityY = 0;
        break;
      case "top":
        this.y = gameObj.y - this.size.height;
        this.isOnFloor = true;

        this.velacityY = 0;
        break;
      case "left":
        this.x = gameObj.x - this.size.width;
        this.velacityX = 0;
        break;
      case "right":
        this.x = gameObj.x + gameObj.size.width;
        this.velacityX = 0;
        break;

      default:
        break;
    }
  }
}
