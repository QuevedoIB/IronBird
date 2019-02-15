"use strict";
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player;
    this.obstacles = [];
    this.interval;
    this.over = false;
    this.animation;
    this.bonus;
  }

  startLoop() {
    this.player = new Player(this.canvas);
    this.base = new Base(this.canvas);

    const generateObstacle = () => {
      this.obstacles.push(new Obstacle(this.canvas));
    };

    this.interval = setInterval(generateObstacle, 1500);

    const updateAnimationFrame = () => this.player.frameUpdate(this.player.frameCount);

    this.animation = setInterval(updateAnimationFrame, 100);

    const loop = () => {
      this.checkPositions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();

      if (this.over === false) {
        window.requestAnimationFrame(loop);
      }
    };
    window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.player.update();
    this.obstacles.map(e => e.update());
  }

  drawCanvas() {
    this.player.draw();
    this.base.draw();
    this.obstacles.map(e => e.draw());
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.obstacles = this.obstacles.filter(e => e.x > -e.size / 10);
  }

  checkPositions() {
    this.player.checkScreen();
    if (this.player.y + this.player.size / 2 > this.base.y - this.base.size / 2) {
      this.over = true;
      this.onGameOver();
    }
    if (
      this.obstacles.some(
        e => e.x < this.player.x + this.player.size / 2 && e.y > this.player.y - this.player.size / 2
        // &&
        // e.x + this.size / 10 > this.player.x - this.player.size / 2
      )
    ) {
      this.over = true;
      this.onGameOver();
    }
    if (
      this.obstacles.some(
        e => e.x < this.player.x + this.player.size / 2 && e.y + e.spaceBetween < this.player.y + this.player.size / 2
        // &&
        // e.x + this.size / 10 > this.player.x - this.player.size / 2
      )
    ) {
      this.over = true;
      this.onGameOver();
    }
  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
}
