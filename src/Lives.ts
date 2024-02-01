export default class Lives {
  lives: number;
  constructor(x, y, color, lives, font) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.lives = lives;
    this.font = font;
    this.initialLives = lives;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }

  loseLife() {
    this.lives = Math.max(0, this.lives - 1);
  }

  reset() {
    this.lives = this.initialLives;
  }
}
