"use strict";
const main = () => {
  let nameHolder;
  let scoreHolder;
  let bonusCollected = 0;
  let skinPlayer = "blue-bird-skin";
  const owned = [];

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
        <img class="start-button" src="./sprites/bigButtonStart.png">
        <button id="shop-button" class="start-button">Shop</button>
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

    const shopButton = document.getElementById("shop-button");
    shopButton.addEventListener("click", buildShopScreen);

    const input = document.getElementById("name-text");
    const leaderBoardText = document.getElementById("leader-boards-text");

    function saveName() {
      let nameValue = input.value;
      if (nameValue === "") {
        nameValue = "Anonymous";
      }
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
  };

  const buildGameOverScreen = () => {
    buildDom(`
    <section class="game-over-section container>
      <audio autoplay loop  id="playAudio">
      <source src="music-project-1/Undertale - Megalovania.mp3" allow="autoplay">
      </audio>
      <div class="container">
        <h1 class="title">You Died</h1>
        <div class="score-text"></div>
        <img class="start-button" src="./sprites/bigRetryButton.png">
        <div id="player-dead-name"></div>
      </div>
    </section>
    `);

    const graveyardName = document.getElementById("player-dead-name");
    graveyardName.innerHTML = `${nameHolder}`;

    if (localStorage[nameHolder] < scoreHolder) {
      localStorage.setItem(nameHolder, scoreHolder);
    }

    const scoreSquare = document.getElementsByClassName("score-text")[0];
    scoreSquare.innerHTML = `Total score: ${scoreHolder} pts!`;

    const retryButton = document.getElementsByClassName("start-button");
    retryButton[0].addEventListener("click", buildGameScreen);

    scoreHolder = 0;
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
      bonusCollected += startGame.bonusIncrease;
      scoreBox.innerText = `Score: ${score.currentTime}`;
      scoreHolder = score.currentTime;
      if (startGame.over === true) {
        clearInterval(score.intervalId);
      }
    };
    score.startClick();
    score.updateDom(timer);

    const section = document.querySelector("section");

    const canvasElement = document.querySelector("canvas");
    const width = document.querySelector(".game-section").offsetWidth;
    const height = document.querySelector(".game-section").offsetHeight;

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);

    const startGame = new Game(canvasElement, skinPlayer);
    startGame.gameOverCallback(buildGameOverScreen);
    startGame.startLoop();

    const setPlayerDirection = () => {
      startGame.player.jump();
    };

    let imgDay = document.getElementById("day-background");
    let number = 1;
    let nightCount = 0;
    let dayCount = 0;

    function animationOpacity() {
      if (number == 0 && nightCount < 4) {
        startGame.night = true;
        startGame.player.night = true;

        nightCount++;
        imgDay.style.opacity = number;
      }

      if (number === 1 && nightCount === 4) {
        startGame.night = false;
        startGame.player.night = false;

        nightCount = 0;
        imgDay.style.opacity = number;
      }

      if (number === 1 && dayCount < 5) {
        dayCount++;
      }

      if (number > 0 && nightCount === 0) {
        number -= 0.25;
        imgDay.style.opacity = number;
      }

      if (number < 1 && nightCount === 4) {
        number += 0.25;
        imgDay.style.opacity = number;
        dayCount = 0;
      }
    }

    const animationTimer = setInterval(animationOpacity, 5685);
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

  const buildShopScreen = () => {
    buildDom(`
      <section id="shop-section" class="container">
        <div class="container">  
          <h1 class="title">Shop</h1>
          <h2 class="score-text"></h2>
        </div>
        <div class="container">
          <div class="container group">
            <img src="./sprites/shop-red-bird.png" />
            <p class="price-word">Price: 
              <span id="red-bird" class="price-text">
              2
              </span>
            </p>
            <div class="row-container">
              <img id="red-bird-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
              <img id="red-bird-equip" class="equip-button" src="./sprites/equipbutton.png" />
            </div>
          </div>
          <div class="container group">
            <img src="./sprites/shop-yellow-bird.png" />
            <p class="price-word">Price: 
              <span id="yellow-bird" class="price-text">
                3
              </span>
            </p>
            <div class="row-container">
              <img id="yellow-bird-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
              <img id="yellow-bird-equip" class="equip-button" src="./sprites/equipbutton.png" />
            </div>
          </div>
          <div>
            <button id="back-to-main" type="button">
              Back to Menu
            </button>
          </div>
        </div>
      </section>
    `);

    let elementDom;

    function getDomElementById(id) {
      console.log("hola");
      elementDom = document.getElementById(id);
      checkValue(elementDom, id);
    }

    function checkValue(element, id) {
      let value = element.innerHTML;
      if (bonusCollected >= value) {
        bonusCollected -= value;
        owned.push(id);
      } else {
        alert("Not enough pts, Go play poor!");
      }
    }

    function checkOwned(skinId) {
      if (owned.some(e => e === skinId)) {
        changePlayerSkin(skinId);
      }
    }

    function changePlayerSkin(skinId) {
      if (skinPlayer !== skinId) {
        skinPlayer = skinId;
      } else {
        skinPlayer = "blue-bird-skin";
      }
    }

    const bonusLeft = document.getElementsByClassName("score-text");

    bonusLeft[0].innerHTML = `${bonusCollected} pts`;

    const purchaseRed = document.getElementById("red-bird-button");
    const equipRed = document.getElementById("red-bird-equip");

    const purchaseYellow = document.getElementById("yellow-bird-button");
    const equipYellow = document.getElementById("yellow-bird-equip");

    const backButton = document.getElementById("back-to-main");

    purchaseRed.addEventListener("click", getDomElementById("red-bird"));
    purchaseYellow.addEventListener("click", getDomElementById("yellow-bird"));
    backButton.addEventListener("click", buildSplash);
    equipRed.addEventListener("click", checkOwned("red-bird-skin"));
    equipYellow.addEventListener("click", checkOwned("yellow-bird-skin"));
  };

  buildSplash();
};

window.addEventListener("load", main);
