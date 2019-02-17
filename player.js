"use strict";
class Player {
  constructor(canvas, playerSkin) {
    this.canvas = canvas;
    this.size = 30;
    this.x = 20 + this.size / 2;
    this.y = this.canvas.height / 2;
    this.context = this.canvas.getContext("2d");
    this.direction = 3.5;
    this.skin = "yellow-bird-skin";
    this.src;
    this.frameCount = "mid-to-top";
    this.jumpSpeed = 35;
    this.vertSpeed = 0;
    this.night = false;
  }
  update() {
    if (!this.night) {
      this.direction = 3.5;
      this.y -= this.vertSpeed * 0.2;
      this.vertSpeed -= this.direction * 0.5;
    } else {
      this.direction = -3.5;
      this.y += this.vertSpeed * 0.2;
      this.vertSpeed += this.direction * 0.5;
    }
  }

  jump() {
    this.vertSpeed = this.jumpSpeed;
  }

  draw() {
    const img = new Image();
    img.onload = function() {};
    img.src = this.src;

    this.context.drawImage(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  frameUpdate(value) {
    if (this.skin === "blue-bird-skin") {
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

    if (this.skin === "red-bird-skin") {
      if (value === "mid-to-top") {
        this.frameCount = "top-to-mid";
        return (this.src = "./sprites/redbird-upflap.png");
      } else if (value === "top-to-mid") {
        this.frameCount = "mid-to-bot";
        return (this.src = "./sprites/redbird-midflap.png");
      } else if (value === "mid-to-bot") {
        this.frameCount = "bot-to-mid";
        return (this.src = "./sprites/redbird-downflap.png");
      } else if (value === "bot-to-mid") {
        this.frameCount = "mid-to-top";
        return (this.src = "./sprites/redbird-midflap.png");
      }
    }

    if (this.skin === "yellow-bird-skin") {
      if (value === "mid-to-top") {
        this.frameCount = "top-to-mid";
        return (this.src = "./sprites/yellowbird-upflap.png");
      } else if (value === "top-to-mid") {
        this.frameCount = "mid-to-bot";
        return (this.src = "./sprites/yellowbird-midflap.png");
      } else if (value === "mid-to-bot") {
        this.frameCount = "bot-to-mid";
        return (this.src = "./sprites/yellowbird-downflap.png");
      } else if (value === "bot-to-mid") {
        this.frameCount = "mid-to-top";
        return (this.src = "./sprites/yellowbird-midflap.png");
      }
    }
  }

  checkScreen() {
    if (this.y - this.size / 2 <= 0) {
      this.y = this.size / 2;
    }
  }

  initialFrame() {
    if (this.skin === "blue-bird-skin") {
      this.src = "./sprites/bluemidglasses.png";
    } else if (this.skin === "red-bird-skin") {
      this.src = "./sprites/redbird-midflap.png";
    } else if (this.skin === "yellow-bird-skin") {
      this.src = "./sprites/yellowbird-midflap.png";
    }
  }
}
