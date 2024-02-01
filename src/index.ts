// Joseph Paul
// ACS 1320 - Breakout OOP

/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import Ball from './Ball';
import Brick from './Brick';
import Paddle from './Paddle';
import Background from './Background';
import Score from './Score';
import Lives from './Lives';

class Game {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  gameOver: boolean;
  gameWon: boolean;
  background: Background;
  ball: Ball;
  paddle: Paddle;
  score: Score;
  lives: Lives;
  bricks: any[];
  rightPressed: boolean;
  leftPressed: boolean;
  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.gameOver = false;
    this.gameWon = false;
    this.background = new Background('#00008B');
    this.ball = new Ball(10, '#39FF14', width / 2, height - 30, 2, -2);
    this.paddle = new Paddle((width - 75) / 2, height - 10, '#39FF14', 75, 10);
    this.score = new Score(8, 20, '#39FF14', 0, '16px Arial');
    this.lives = new Lives(width - 65, 20, '#39FF14', 3, '16px Arial');
    this.bricks = [];
    this.rightPressed = false;
    this.leftPressed = false;
    this.initBricks();
    this.bindEventHandlers();
  }

  initBricks() {
    const rowCount = 5;
    const columnCount = 6;
    const brickWidth = 75;
    const brickHeight = 20;
    const padding = 10;
    const offsetTop = 30;
    const offsetLeft = 30;
    const colors = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#FB8C00'];

    for (let c = 0; c < columnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < rowCount; r += 1) {
        const brickX = c * (brickWidth + padding) + offsetLeft;
        const brickY = r * (brickHeight + padding) + offsetTop;
        const color = colors[r % colors.length];
        this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, color, 1);
      }
    }
  }

  bindEventHandlers() {
    document.addEventListener('keydown', (e) => this.keyDownHandler(e), false);
    document.addEventListener('keyup', (e) => this.keyUpHandler(e), false);
    document.addEventListener('mousemove', (e) => this.mouseMoveHandler(e), false);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.background.draw(this.ctx, this.width, this.height);
    this.drawBricks();
    this.ball.render(this.ctx);
    this.paddle.draw(this.ctx);
    this.score.render(this.ctx);
    this.lives.render(this.ctx);

    if (this.gameOver) {
      this.drawGameOver();
      return;
    }

    if (this.gameWon) {
      this.drawGameWon();
      return;
    }

    this.collisionDetection();
    this.handlePaddleMovement();
    this.ball.move();

    if (this.ball.x + this.ball.dx > this.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }

    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.lives.loseLife();
        if (this.lives.lives <= 0) {
          this.gameOver = true;
          this.drawGameOver();
          return;
        }
        this.resetBallAndPaddle();
      }
    }

    requestAnimationFrame(() => this.draw());
  }

  drawBricks() {
    for (let c = 0; c < this.bricks.length; c += 1) {
      for (let r = 0; r < this.bricks[c].length; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(this.ctx);
        }
      }
    }
  }

  collisionDetection() {
    let allBricksCleared = true;
    for (let c = 0; c < this.bricks.length; c += 1) {
      for (let r = 0; r < this.bricks[c].length; r += 1) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          allBricksCleared = false;
          if (this.ball.x > b.x && this.ball.x < b.x + b.width && this.ball.y > b.y && this.ball.y < b.y + b.height) {
            this.ball.dy = -this.ball.dy;
            b.status = 0;
            this.score.update(1);
          }
        }
      }
    }
    if (allBricksCleared) {
      this.gameWon = true;
    }
  }

  drawGameOver() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.font = '36px Arial';
    this.ctx.fillStyle = '#39FF14';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.width / 2, this.height / 2);
    this.ctx.font = '24px Arial';
    this.ctx.fillText('Click to restart', this.width / 2, this.height / 2 + 50);
    this.ctx.canvas.addEventListener('click', () => document.location.reload(), { once: true });
  }

  drawGameWon() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.font = '36px Arial';
    this.ctx.fillStyle = '#39FF14';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('YOU WIN!', this.width / 2, this.height / 2);
    this.ctx.font = '24px Arial';
    this.ctx.fillText('CLICK TO PLAY AGAIN', this.width / 2, this.height / 2 + 50);
    this.ctx.canvas.addEventListener('click', () => document.location.reload(), { once: true });
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    const relativeX = e.clientX - this.ctx.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  handlePaddleMovement() {
    if (this.rightPressed && this.paddle.x < this.width - this.paddle.width) {
      this.paddle.x += 7;
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
    }
  }

  resetBallAndPaddle() {
    this.ball.x = this.width / 2;
    this.ball.y = this.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = (this.width - this.paddle.width) / 2;
  }
}

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const game = new Game(ctx, canvas.width, canvas.height);
game.draw();
