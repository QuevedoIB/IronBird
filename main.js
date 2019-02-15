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

    //cambiar al final
    buttonLeaderboards[0].addEventListener("click", buildGameOverScreen);
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

  const buildGameScreen = () => {
    buildDom(`
    <section class="game-section">
    <div id="timer">Score</div>  
    <canvas></canvas>
    </section>
    `);

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
  };

  buildSplash();
};

window.addEventListener("load", main);
