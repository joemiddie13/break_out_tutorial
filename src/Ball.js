export default class Ball {
  constructor(radius, color, x, y, dx, dy) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}
