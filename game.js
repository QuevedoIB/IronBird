"use strict";
class Game {
  constructor(canvas, skinPlayer) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player;
    this.obstacles = [];
    this.bonus = [];
    this.interval;
    this.bonusStatus;
    this.over = false;
    this.animation;
    this.pause = false;
    this.holdPause = false;
    this.night = false;
    this.playerSkin = skinPlayer;
  }

  startLoop() {
    this.player = new Player(this.canvas, this.playerSkin);
    this.base = new Base(this.canvas);

    const generate = () => {
      if (!this.pause) {
        const random = Math.floor(Math.random() * 2);

        this.obstacles.push(new Obstacle(this.canvas, this.night));

        if (random === 0) {
          this.bonus.push(new Bonus(this.canvas, 50));
        } else {
          this.bonus.push(new Bonus(this.canvas, 300));
        }
      }
    };

    this.interval = setInterval(generate, 1500);

    const updateAnimationFrame = () => this.player.frameUpdate(this.player.frameCount);

    this.animation = setInterval(updateAnimationFrame, 100);

    const loop = () => {
      if (!this.pause) {
        this.checkPositions();
        this.updateCanvas();
        this.clearCanvas();
        this.drawCanvas();
      }

      if (this.over === false) {
        window.requestAnimationFrame(loop);
      }
    };
    window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.player.update();
    this.obstacles.map(e => e.update());
    this.bonus.map(e => e.update());
  }

  drawCanvas() {
    this.player.draw();
    this.base.draw();
    this.obstacles.map(e => e.draw());
    this.bonus.map(e => e.draw());
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.obstacles = this.obstacles.filter(e => e.x > -e.size / 10);
    this.bonus = this.bonus.filter(e => e.x > -50);
  }

  checkPositions() {
    const playerXPlus = this.player.x + this.player.size / 2;
    const playerYPlus = this.player.y + this.player.size / 2;
    const playerYSubstract = this.player.y - this.player.size / 2;
    const playerXSubstract = this.player.x - this.player.size / 2;
    this.player.checkScreen();

    if (
      this.bonus.some(
        e =>
          e.x < playerXPlus && //- e.size / 2
          e.y + e.size / 2 > playerYSubstract &&
          e.y < playerYPlus && //- e.size / 2
          e.x + e.size / 2 > playerXSubstract
      )
    ) {
      this.bonusStatus = true;
      this.bonus = this.bonus.filter(
        e =>
          playerXPlus < e.x - e.size / 2 &&
          playerYSubstract > e.y + e.size / 2 &&
          playerYPlus < e.y - e.size / 2 &&
          playerXSubstract > e.x - e.size / 2
      );
    }

    // if (playerYPlus > this.base.y - this.base.size / 2) {
    //   this.over = true;
    //   this.onGameOver();
    // }
    // if (this.obstacles.some(e => e.x < playerXPlus && e.y > playerYSubstract)) {
    //   this.over = true;
    //   this.onGameOver();
    // }
    // if (this.obstacles.some(e => e.x < playerXPlus && e.y + e.spaceBetween < playerYPlus)) {
    //   this.over = true;
    //   this.onGameOver();
    // }
  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }

  bonusIncrease() {
    if (this.bonusStatus) {
      this.bonusStatus = false;
      return 50;
    } else {
      return 0;
    }
  }
}
