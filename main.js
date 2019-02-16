"use strict";
const main = () => {
  const buildDom = html => {
    const body = document.querySelector("body");
    body.innerHTML = html;
    return body;
  };

  const buildSplash = () => {
    buildDom(`
    <section class="container splash-section">
      <audio autoplay loop  id="playAudio">
      <source src="music-project-1/intromusic.mp3">
      </audio>
      <article class="container buttons-start">
        <button class="start-button">START</button>
        <button class="leaderboards-button">LEADERBOARDS</button>
      </article>
      <article class="instructions">
      <h4 class="instructions-title">Instructions</h4>
        <ul class="instruction-list container">
        <li> Drink Coffee </li>
        <li> Dodge obstacles </li>
        <li> Stay focused </li>
        </article>
    </section>
    `);

    const buttonStart = document.getElementsByClassName("start-button");

    buttonStart[0].addEventListener("click", buildGameScreen);

    const buttonLeaderboards = document.getElementsByClassName("leaderboards-button");

    //cambiar al final
    buttonLeaderboards[0].addEventListener("click", buildGameOverScreen);
  };

  const buildGameOverScreen = () => {
    buildDom(`
    <section class="game-over-section>
      <audio autoplay loop  id="playAudio">
      <source src="music-project-1/Undertale - Megalovania.mp3" allow="autoplay">
      </audio>
      <h1 class="title">Game Over</h1>
      <div class="container">
        <p>Score</p>
        <button class="start-button">Retry</button>
      </div>
    </section>
    `);

    const retryButton = document.querySelector("button");
    retryButton.addEventListener("click", buildGameScreen);
  };

  const buildGameScreen = () => {
    buildDom(`
    <section class="game-section">
      <audio autoplay loop  id="playAudio">
      <source src="music-project-1/Undertale - Megalovania.mp3" allow="autoplay">
      </audio>
    <div id="timer"></div>  
    <div id="pause-text" class="container hide"><h1 id="pause-title">Paused</h1>
    <p>Press SPACEBAR to resume</p>
    </div>
    <canvas></canvas>
    </section>
    `);

    const pause = document.getElementById("pause-text");
    const scoreBox = document.getElementById("timer");

    const score = new Score();
    const timer = () => {
      score.currentTime += startGame.bonusIncrease();
      scoreBox.innerText = `Score: ${score.currentTime}`;
    };
    score.startClick();
    score.updateDom(timer);

    const section = document.querySelector("section");
    const canvasElement = document.querySelector("canvas");
    const width = document.querySelector(".game-section").offsetWidth;
    const height = document.querySelector(".game-section").offsetHeight;

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);

    const startGame = new Game(canvasElement);
    startGame.gameOverCallback(buildGameOverScreen);
    startGame.startLoop();

    const setPlayerDirection = () => {
      startGame.player.jump();
    };

    section.addEventListener("click", setPlayerDirection);
    window.addEventListener("keydown", function(e) {
      const key = e.keyCode;
      if (key === 32) {
        if (startGame.pause === true && startGame.holdPause === false) {
          pause.classList.add("hide");
          startGame.holdPause = true;
          score.holdPause = true;
          startGame.pause = false;
          score.pause = false;
        } else if (startGame.pause === false && startGame.holdPause === false) {
          pause.classList.remove("hide");
          score.holdPause = true;
          startGame.holdPause = true;
          startGame.pause = true;
          score.pause = true;
        }
      }
    });

    window.addEventListener("keyup", function(e) {
      const key = e.keyCode;
      if (key === 32) {
        startGame.holdPause = false;
        score.holdPause = false;
      }
    });
  };

  buildSplash();
};

window.addEventListener("load", main);
