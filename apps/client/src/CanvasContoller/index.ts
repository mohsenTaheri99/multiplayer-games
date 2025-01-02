import { GameObject } from "game-entities";

export class CanvasContoller {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor(app: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 500;
    this.canvas.height = 500;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error(
        "Canvas 2D is not supported in your browser. Please use a modern browser that supports HTML5."
      );
    }
    this.ctx = ctx;

    app.appendChild(this.canvas);
  }

  get canvasSize() {
    return { width: this.canvas.width, height: this.canvas.height };
  }

  async clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws an image onto the canvas at a specific position and size.
   *
   * @param img - The image to be drawn on the canvas.
   * @param position - The position on the canvas where the image will be drawn (top-left corner).
   * @param size - The dimensions to scale the image to on the canvas.
   */

  draw(
    img: HTMLImageElement,
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) {
    this.ctx.drawImage(img, position.x, position.y, size.width, size.height);
  }
  /**
   * Draws a specific frame from a sprite sheet onto the canvas.
   *
   * @param  img - The image or sprite sheet to draw from.
   * @param  size - The dimensions to scale the frame to on the canvas.
   * @param  position - The position on the canvas to draw the frame.
   * @param  frameSize - The dimensions of a single frame in the sprite sheet.
   * @param  currentFrame - The column index (x-axis) of the frame in the sprite sheet.
   * @param  rows - rows of frame
   * @param forward - direction of object
   */
  drowFrame(
    img: HTMLImageElement,
    size: { width: number; height: number },
    position: { x: number; y: number },
    frameSize: { width: number; height: number },
    currentFrame: number,
    rows: number,
    forward: "left" | "right"
  ) {
    const { width, height } = size;
    const { x, y } = position;
    const { width: frameWidth, height: frameHeight } = frameSize;
    const frameX = (currentFrame % rows) * frameWidth;
    const frameY = Math.floor(currentFrame / rows) * frameHeight;
    if (forward === "right") {
      this.ctx.save();
      this.ctx.scale(-1, 1);
    }
    console.log(forward);
    this.ctx.drawImage(
      img,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      forward === "right" ? -x - width : x,
      y,
      width,
      height
    );
    if (forward === "right") this.ctx.restore();
  }
}
