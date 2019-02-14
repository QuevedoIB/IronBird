"use strict";
const main = () => {
  const buildDom = html => {
    const body = document.querySelector("body");
    body.innerHTML = html;
    return body;
  };

  const buildSplash = () => {
    buildDom(`
    <section class="splash-section">
      <article class="buttons-start container">
        <button class="start-button">START</button>
        <button class="leaderboards-button">LEADERBOARDS</button>
      </article>
    </section>
    `);

    const buttonStart = document.getElementsByClassName("start-button");

    buttonStart[0].addEventListener("click", buildGameScreen);

    const buttonLeaderboards = document.getElementsByClassName("leaderboards-button");

    buttonLeaderboards[0].addEventListener("click", buildGameOverScreen);
  };

  const buildGameScreen = () => {
    buildDom(`
    <section class="game-section">
      <canvas></canvas>
    </section>
    `);

    const canvasElement = document.querySelector("canvas");
    const width = document.querySelector(".game-section").offsetWidth;
    const height = document.querySelector(".game-section").offsetHeight;

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);

    const startGame = new Game(canvasElement);
    startGame.startLoop();

    const setPlayerDirection = event => {
      game.player.setDirection(1);
    };

    document.addEventListener("click", setPlayerDirection);
  };

  const buildGameOverScreen = () => {
    buildDom(`
    <section class="game-over-section>
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

  buildSplash();
};

window.addEventListener("load", main);
