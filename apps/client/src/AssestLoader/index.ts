import { GameObject } from "game-entities";

export class AssetsLoader {
  private loadedAssets: Record<string, HTMLImageElement>;
  private gameObjects: GameObject[];
  private totalAssets: number;
  private loadedCount = 0;
  private backGround: string;
  private progress: number;
  private onProgresChenge: ((prog: number) => void)[];
  constructor(gameObjs: GameObject[], backGround: string) {
    this.loadedAssets = {};
    this.gameObjects = gameObjs;
    this.backGround = backGround;
    this.totalAssets = gameObjs.length + 1;
    this.progress = 0;
    this.onProgresChenge = [];
  }

  load(): Promise<Record<string, HTMLImageElement>> {
    return new Promise((resolve, reject) => {
      this.gameObjects.forEach((go) => {
        const urls = go.animation.map((anim) => anim.imgaeUrl);
        urls.forEach((url) => {
          if (this.loadedAssets[url]) return;

          const img = new Image();
          img.src = url;

          img.onload = () => this.assetLoaded(resolve);
          img.onerror = () => reject(`Failed to load image: ${url}`);

          this.loadedAssets[url] = img;
        });
      });

      const backgroundImg = new Image();
      backgroundImg.src = this.backGround;

      backgroundImg.onload = () => this.assetLoaded(resolve);
      backgroundImg.onerror = () =>
        reject(`Failed to load image: ${this.backGround}`);
      this.loadedAssets[this.backGround] = backgroundImg;
    });
  }

  private assetLoaded(
    resolve: (value: Record<string, HTMLImageElement>) => void
  ) {
    this.loadedCount++;
    this.updateProgress();
    if (this.loadedCount === this.totalAssets) {
      resolve(this.loadedAssets);
    }
  }
  private updateProgress() {
    this.progress = (this.loadedCount / this.totalAssets) * 100;
    this.onProgresChenge.forEach((cl) => cl(this.progress));
  }

  set onProgress(cl: (prog: number) => void) {
    this.onProgresChenge.push(cl);
  }

  static async loadAnAsset(url: string) {
    const image = new Image();
    image.src = url;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject();
    });

    return image;
  }
}
