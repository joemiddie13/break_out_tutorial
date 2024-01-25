export default class Background {
  constructor(color) {
    this.color = color;
  }

  draw(ctx, canvasWidth, canvasHeight) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}
