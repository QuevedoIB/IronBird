"use strict";
class Bonus {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = this.canvas.width;
    this.y = this.canvas.height + 100;
    this.size = 30;
    this.direction;
  }

  update() {
    this.x -= this.direction;
  }

  draw() {
    this.context.fillStyle = "blue";
    this.context.fillRect(this.x, 10, this.size, this.size);
  }
}
