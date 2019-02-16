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
    this.srcBot = "./sprites/pipe-green.png";
    this.srcTop = "./sprites/top-green-pipe.png";
  }
  update() {
    this.x -= this.direction;
  }
  draw() {
    this.y = this.randomNumber;

    const imgBot = new Image();
    imgBot.onload = function() {};
    imgBot.src = this.srcBot;

    const imgTop = new Image();
    imgTop.onload = function() {};
    imgTop.src = this.srcTop;

    this.context.drawImage(imgTop, this.x, 0, this.size / 10, this.y);
    this.context.drawImage(imgBot, this.x, this.y + this.spaceBetween, this.size / 10, this.canvas.height);
  }
}
