"use strict";
class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.size = 30;
    this.x = 20 + this.size / 2;
    this.y = this.canvas.height / 2;
    this.context = this.canvas.getContext("2d");
    this.direction = 4;
  }
  update() {
    this.y = this.y + this.direction;
  }

  jump() {
    this.y -= 90;
  }

  draw() {
    this.context.fillStyle = "green";
    this.context.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  checkScreen() {
    if (this.y - this.size / 2 <= 0) {
      this.y = this.size / 2;
    }
  }
  checkCollision() {}
}
