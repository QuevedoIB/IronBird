"use strict";
class Score {
  constructor(canvas) {
    this.currentTime = 0;
    this.intervalId = null;
    this.pause = true;
    this.holdPause = false;
  }
  startClick() {
    let addTime = () => {
      if (!this.pause) {
        this.currentTime++;
        this.update();
      }
    };

    this.intervalId = setInterval(addTime, 500);
  }

  updateDom(callback) {
    this.update = callback;
  }
}
