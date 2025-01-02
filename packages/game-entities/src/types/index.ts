import { GameObject } from "../entities/GameObject";

export interface GameEnvironment {
  serializeFloors: ReturnType<GameObject["serialize"]>[];
  gravity: number;
  backGrundImage: {
    url: string;
  };
  gameSize: {
    width: number;
    height: number;
  };
  spawnPositions: [
    {
      x: number;
      y: number;
    },
  ];
}

export interface animation {
  name: string;
  imgaeUrl: string;
  frames: number;
  rows: number;
  framesSize: { width: number; height: number };
  imageSize: { width: number; height: number };
}
export interface GameObjectOptions {
  name: string;
  position?: {
    x: number;
    y: number;
  };
  velacity?: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };

  animations: animation[];
}
