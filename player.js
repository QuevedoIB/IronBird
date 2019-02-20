"use strict";
class Player {
  constructor(canvas, playerSkin) {
    this.canvas = canvas;
    this.size = 30;
    this.x = 20 + this.size / 2;
    this.y = this.canvas.height / 2;
    this.context = this.canvas.getContext("2d");
    this.direction = 3.5;
    this.skin = playerSkin;
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
    switch (value) {
      case "mid-to-top":
        this.frameCount = "top-to-mid";
        this.src = `./sprites/skins/${this.skin}-top.png`;
        break;
      case "top-to-mid":
        this.frameCount = "mid-to-bot";
        this.src = `./sprites/skins/${this.skin}.png`;
        break;
      case "mid-to-bot":
        this.frameCount = "bot-to-mid";
        this.src = `./sprites/skins/${this.skin}-bot.png`;
        break;
      case "bot-to-mid":
        this.frameCount = "mid-to-top";
        this.src = `./sprites/skins/${this.skin}.png`;
        break;
    }
  }

  checkScreen() {
    if (this.y - this.size / 2 <= 0) {
      this.y = this.size / 2;
    }
  }

  initialFrame() {
    this.src = `./sprites/skins/${this.skin}.png`;
  }
}
