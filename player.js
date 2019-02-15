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
    this.frameCount = "mid-to-top";
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
    if (value === "mid-to-top") {
      this.frameCount = "top-to-mid";
      return (this.src = "./sprites/blueupglasses.png");
    } else if (value === "top-to-mid") {
      this.frameCount = "mid-to-bot";
      return (this.src = "./sprites/bluemidglasses.png");
    } else if (value === "mid-to-bot") {
      this.frameCount = "bot-to-mid";
      return (this.src = "./sprites/bluedownglasses.png");
    } else if (value === "bot-to-mid") {
      this.frameCount = "mid-to-top";
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
