"use strict";
class Base {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.size = this.canvas.width;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height + 50;
  }

  draw() {
    this.context.fillStyle = "red";
    this.context.fillRect(0, this.y - this.size / 2, this.size, this.size);
  }
}
