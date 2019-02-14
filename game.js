"use strict";
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player;
    this.obstacles = [];
    this.bonus;
  }

  startLoop() {
    this.player = new Player(this.canvas);
    const loop = () => {};
    window.requestAnimationFrame(loop);
  }

  updateCanvas() {}
}
