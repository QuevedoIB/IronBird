"use strict";
const main = () => {
  let nameHolder;
  let scoreHolder;

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
        <input type="text" id="name-text" placeholder=" Insert Name">
        <button class="start-button">START</button>
        <div class="leaderBoards">
          <h4 class="instructions-title">LEADERBOARDS</h4>
          <p id="leader-boards-text"></p>
        </div>
        <div class="commands">
        <p>Left click to JUMP</p>
        <p>Spacebar to pause</p>
        </div>
      </article>
      <article class="container instructions">
      <h4 class="instructions-title">Instructions</h4>
        <ul class="instruction-list container">
        <li> Drink Coffee </li>
        <li> Dodge obstacles </li>
        <li> Stay focused </li>
        </article>
    </section>
    `);

    const input = document.getElementById("name-text");
    const leaderBoardText = document.getElementById("leader-boards-text");

    function saveName() {
      let nameValue = input.value;
      console.log(nameValue);
      if (nameValue === "") {
        nameValue = "Anonymous";
      }
      console.log(nameHolder);
      nameHolder = nameValue;
      if (nameValue) {
        localStorage.setItem(nameValue, 0);
      }
    }

    function sortLocalStorage() {
      if (localStorage.length > 0) {
        let localStorageArray = [];
        for (let i = 0; i < localStorage.length; i++) {
          localStorageArray.push([localStorage.key(i), localStorage.getItem(localStorage.key(i))]);
        }

        let sortedLocalArray = localStorageArray.sort((a, b) => b[1] - a[1]);

        let top3 = sortedLocalArray.slice(0, 3);
        localStorage.clear();

        top3.forEach(e => {
          localStorage.setItem(e[0], e[1]);
          leaderBoardText.innerHTML += `${e[0]}: ${e[1]} pts<br>`;
        });
      }
    }

    sortLocalStorage();

    const buttonStart = document.getElementsByClassName("start-button");

    window.addEventListener("keydown", function(e) {
      const keyDown = e.keyCode;
      if (keyDown === 13) {
        saveName();
      }
    });

    buttonStart[0].addEventListener("click", buildGameScreen);
    buttonStart[0].addEventListener("click", saveName);

    // const buttonLeaderboards = document.getElementsByClassName("leaderboards-button");
    // //cambiar al final
    // buttonLeaderboards[0].addEventListener("click", buildGameOverScreen);
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

    if (localStorage[nameHolder] < scoreHolder) {
      localStorage.setItem(nameHolder, scoreHolder);
    }

    const retryButton = document.querySelector("button");
    retryButton.addEventListener("click", buildGameScreen);
  };

  const buildGameScreen = () => {
    buildDom(`
    <section class="game-section">
      <audio autoplay loop  id="playAudio">
      <source src="music-project-1/Undertale - Megalovania.mp3" allow="autoplay">
      </audio>
      <img src="./sprites/background-night.png" id="night-background">
      <img src="./sprites/background-day.png" id="day-background"> 
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
      scoreHolder = score.currentTime;
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

    let imgDay = document.getElementById("day-background");

    let nightCount = 0;

    imgDay.style.opacity = 1;

    let opacityInterval;

    function startOpacity() {
      setInterval(animationOpacity, 5000);
    }

    function animationOpacity() {
      if (imgDay.style.opacity == 0 && nightCount < 4) {
        //console.log("2");
        startGame.night = true;
        startGame.player.night = true;
        nightCount++;
      }

      if (imgDay.style.opacity >= 0 && nightCount === 0) {
        //console.log("1");
        imgDay.style.opacity -= 0.25;
      }

      if (imgDay.style.opacity < 1 && nightCount === 4) {
        //console.log("3");
        imgDay.style.opacity += 0.25; //falla la suma
      }

      if (imgDay.style.opacity == 1 && nightCount === 4) {
        //console.log("4");
        clearInterval(opacityInterval);
        startGame.night = false;
        startGame.player.night = false;
        nightCount = 0;
      }
    }

    const animationTimer = setInterval(startOpacity, 20000);
    window.onload = animationTimer;

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
