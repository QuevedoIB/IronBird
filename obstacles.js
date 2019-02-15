"use strict";
class Obstacle {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.size = this.canvas.height;
    this.x = this.canvas.width;
    this.y;
    this.direction = 4;
    this.spaceBetween = 200;
    this.randomNumber = Math.floor(Math.random() * (this.canvas.height - 288));
    this.src = "./sprites/pipe-green.png";
  }
  update() {
    this.x -= this.direction;
  }
  draw() {
    this.y = this.randomNumber;

    const img = new Image();
    img.onload = function() {};
    img.src = this.src;

    this.context.drawImage(img, this.x, 0, this.size / 10, this.y);
    this.context.drawImage(img, this.x, this.y + this.spaceBetween, this.size / 10, this.canvas.height);
  }
}
