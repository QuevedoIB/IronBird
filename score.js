"use strict";
class Score {
  constructor(canvas) {
    this.currentTime = 0;
    this.intervalId = null;
  }
  startClick() {
    let addTime = () => {
      this.currentTime++;
      this.update();
    };

    this.intervalId = setInterval(addTime, 500);
  }

  updateDom(callback) {
    this.update = callback;
  }
}
