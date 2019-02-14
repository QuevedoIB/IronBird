"use strict";
class Obstacle {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.size = this.canvas.height;
    this.x = this.size + 1; //mirar el +1
    this.y = this.canvas.height / 2;
    this.direction = 4;
    this.spaceBetween = 100;
    this.randomNumber = Math.floor(Math.random() * (this.canvas.height - 144));
  }
  update() {
    this.x -= this.direction;
  }
  draw() {
    const number = this.randomNumber;
    this.context.fillStyle = "red";
    this.context.fillRect(this.x, 0, this.size / 10, number);
    this.context.fillRect(this.x, number + this.spaceBetween, this.size / 10, this.canvas.height);
  }
}

// "use strict";
// class Obstacle {
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.context = this.canvas.getContext("2d");
//     this.size = this.canvas.height;
//     this.x = this.size + 1;
//     this.y = this.canvas.height / 2;
//     this.direction = 4;
//     this.randomNumber = Math.floor(Math.random() * 100);
//   }
//   update() {
//     this.x -= this.direction;
//   }
//   draw() {
//     this.context.fillStyle = "red";
//     const sizeTotal = this.size / 2 + 30;
//     const rest = sizeTotal - sizeTotal / this.randomNumber;
//     this.context.fillRect(this.x, this.y - this.size / 2, this.size / 10, sizeTotal / this.randomNumber);
//     this.context.fillRect(this.x, this.y - this.size / 2, this.size / 10, rest);
//   }
// }
