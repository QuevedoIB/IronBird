"use strict";
class Obstacle {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.size = this.canvas.height;
    this.x = this.size + 1;
    this.y = this.canvas.height / 2;
    this.direction = 4;
  }
  update() {
    this.x -= this.direction;
  }
  draw() {
    this.context.fillStyle = "red";
    this.context.fillRect(this.x, this.y - this.size / 2, this.size / 10, this.size);
  }
}
