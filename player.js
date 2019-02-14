"use strict";
class Player {
  constructor() {
    this.size = 50;
    this.x = 20 + this.size / 2;
    this.y = this.canvas.height / 2;
    this.context = this.canvas.getContext("2d");
    this.direction = 0;
  }
  update() {
    this.y = this.y - this.direction;
  }
  draw() {
    this.context.fillStyle = "green";
    this.context.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
  checkScreen() {}
  checkCollision() {}
}
