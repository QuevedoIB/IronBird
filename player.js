"use strict";
class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.size = 30;
    this.x = 20 + this.size / 2;
    this.y = this.canvas.height / 2;
    this.context = this.canvas.getContext("2d");
    this.direction = 4;
    this.src = "./sprites/bluemidglasses.png";
    this.frameCount = "mid-top0";
  }
  update() {
    this.y = this.y + this.direction;
  }

  jump() {
    this.y -= 90;
  }

  draw() {
    const img = new Image();
    img.onload = function() {};
    img.src = this.src;

    this.context.drawImage(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  frameUpdate(value) {
    console.log(this.frameCount);
    if (value === "mid-top0") {
      this.frameCount = "mid-top1";
      return (this.src = "./sprites/blueupglasses.png");
    } else if (value === "mid-top1") {
      this.frameCount = "mid-bot0";
      return (this.src = "./sprites/bluemidglasses.png");
    } else if (value === "mid-bot0") {
      this.frameCount = "mid-bot1";
      return (this.src = "./sprites/bluedownglasses.png");
    } else if (value === "mid-bot1") {
      this.frameCount = "mid-top0";
      return (this.src = "./sprites/bluemidglasses.png");
    }
  }

  checkScreen() {
    if (this.y - this.size / 2 <= 0) {
      this.y = this.size / 2;
    }
  }
  checkCollision() {}
}

// draw() {
//   const img = new Image();
//   img.onload = function() {};
//   img.src = "./sprites/bluemidglasses.png";
//   this.context.drawImage(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
// }

// draw() {
//   this.context.fillStyle = "green";
//   this.context.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
// }
