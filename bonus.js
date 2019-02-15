"use strict";
class Bonus {
  constructor(canvas, y) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = this.canvas.width + this.canvas.width / 2;
    this.y = y;
    this.size = 30;
    this.direction = 4;
  }

  update() {
    this.x -= this.direction;
  }

  draw() {
    this.context.fillStyle = "blue";
    this.context.fillRect(this.x, this.y, this.size, this.size);
  }
}
