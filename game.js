"use strict";
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player;
    this.obstacles = [];
    this.interval;
    this.bonus;
  }

  startLoop() {
    this.player = new Player(this.canvas);
    this.base = new Base(this.canvas);

    const generateObstacle = () => {
      this.obstacles.push(new Obstacle(this.canvas));
    };

    this.interval = setInterval(generateObstacle, 1500);

    const loop = () => {
      this.checkPositions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();

      window.requestAnimationFrame(loop);
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
  }

  checkPositions() {
    this.player.checkScreen();
    if (this.player.y + this.player.size / 2 > this.base.y - this.base.size / 2) {
      this.onGameOver();
    }
  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
}
