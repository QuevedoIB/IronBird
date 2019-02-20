"use strict";
class Bonus {
  constructor(canvas, y, bonusSkin) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = this.canvas.width + this.canvas.width / 2;
    this.y = y;
    this.size = 50;
    this.direction = 4;
    this.src = `./sprites/skins/${bonusSkin}.png`;
  }

  update() {
    this.x -= this.direction;
  }

  draw() {
    const img = new Image();
    img.onload = function() {};
    img.src = this.src;

    this.context.drawImage(img, this.x, this.y, this.size, this.size);
  }
}
