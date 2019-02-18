"use strict";
const main = () => {
  let nameHolder;
  let scoreHolder;
  let bonusCollected = 0;
  let skinPlayer = "blue-bird-skin";
  const owned = [];
  let spacebarHolder = false;
  let musicHolder = true;
  let pauseHolder = true;

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
        <div class="row-container">
          <img class="start-button" src="./sprites/yellowbigstart.png">
          <img id="shop-button" class="start-button" src="./sprites/yellowbigshop.png">
        </div>
      </article>
      <article class="container instructions">
        <h4 class="instructions-title">Instructions</h4>
        <div class="commands container">
          <p>Left click/spacebar to JUMP</p>
          <p>P to pause/S to mute game</p>
        </div>
        <ul class="instruction-list container">
          <li> Drink Coffee </li>
          <li> Dodge obstacles </li>
          <li> Stay focused </li>
        </ul>
      </article>
      <article class="leader-boards">
        <h4 class="instructions-title">LEADERBOARDS</h4>
        <p id="leader-boards-text"></p>
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
      <audio id="playAudio" src="music-project-1/endmusic.mp3">
      </audio>
      <div class="container">
        <h1 class="title">You Died</h1>
        <div class="score-text"></div>
        <div class="row-container">
          <img class="start-button" src="./sprites/bigRetryButton.png">
          <img id="back-to-main" src="./sprites/bigMenuButton.png" />
        </div>
        <div id="player-dead-name"></div>
      </div>
    </section>
    `);

    pauseHolder = true;

    const graveyardName = document.getElementById("player-dead-name");
    graveyardName.innerHTML = `${nameHolder}`;

    if (localStorage[nameHolder] < scoreHolder) {
      localStorage.setItem(nameHolder, scoreHolder);
    }

    const scoreSquare = document.getElementsByClassName("score-text")[0];
    scoreSquare.innerHTML = `Total score: ${scoreHolder} pts!`;

    const retryButton = document.getElementsByClassName("start-button");
    retryButton[0].addEventListener("click", buildGameScreen);

    const backButton = document.getElementById("back-to-main");
    backButton.addEventListener("click", buildSplash);

    scoreHolder = 0;
  };

  const buildGameScreen = () => {
    buildDom(`
    <section class="game-section">
      <img id="sound-button" src="./sprites/sound.png"/>
      <audio autoplay loop  id="play-audio">
        <source src="music-project-1/Undertale - Megalovania.mp3" allow="autoplay">
      </audio>
      <img src="./sprites/background-night.png" id="night-background">
      <img src="./sprites/background-day.png" id="day-background"> 
      <div id="timer"></div>  
      <div id="pause-text" class="container hide"><h1 class="pause-title">Paused</h1>
        <p>Press P to resume</p>
      </div>
      <div id="click-to-start">
        <h1 class="pause-title">CLICK or press SPACEBAR to START</h1>
      </div>
      <canvas></canvas>
    </section>
    `);

    const soundButton = document.getElementById("sound-button");
    const audioGame = document.getElementById("play-audio");
    const startText = document.getElementById("click-to-start");

    const stopMusic = () => {
      if (musicHolder === true) {
        musicHolder = false;
        audioGame.pause();
      } else {
        audioGame.play();
        musicHolder = true;
      }
      music();
    };

    const music = () => {
      if (musicHolder) {
        soundButton.src = "./sprites/sound.png";
      } else {
        soundButton.src = "./sprites/no-sound.png";
      }
    };

    soundButton.addEventListener("click", stopMusic);

    const pause = document.getElementById("pause-text");
    const scoreBox = document.getElementById("timer");

    const score = new Score();
    const timer = () => {
      let valueUpgrade = startGame.bonusIncrease();
      score.currentTime += valueUpgrade;
      bonusCollected += valueUpgrade;

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
      startText.classList.add("hide");
      startGame.pause = false;
      score.pause = false;
      pauseHolder = false;
      if (!pause.classList.contains("hide")) {
        pause.classList.add("hide");
      }
      startGame.player.jump();
    };

    let imgDay = document.getElementById("day-background");
    let number = 1;
    let nightCount = 0;
    let dayCount = 0;

    function animationOpacity() {
      if (pauseHolder === false) {
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
    }

    const animationTimer = setInterval(animationOpacity, 5685);
    window.onload = animationTimer;

    section.addEventListener("click", setPlayerDirection);

    window.addEventListener("keydown", function(e) {
      const key = e.keyCode;
      if (key === 80) {
        if (startGame.pause === true && startGame.holdPause === false) {
          pause.classList.add("hide");
          startGame.holdPause = true;
          score.holdPause = true;
          startGame.pause = false;
          score.pause = false;
          pauseHolder = false;
        } else if (startGame.pause === false && startGame.holdPause === false) {
          pause.classList.remove("hide");
          score.holdPause = true;
          startGame.holdPause = true;
          startGame.pause = true;
          score.pause = true;
          pauseHolder = true;
        }
      }
    });

    window.addEventListener("keyup", function(e) {
      const key = e.keyCode;
      if (key === 80) {
        startGame.holdPause = false;
        score.holdPause = false;
      }
    });

    window.addEventListener("keydown", function(e) {
      const key = e.keyCode;
      if (key === 32) {
        if (spacebarHolder === false) {
          setPlayerDirection();
          spacebarHolder = true;
        }
      }
    });

    window.addEventListener("keyup", function(e) {
      const key = e.keyCode;
      if (key === 32) {
        spacebarHolder = false;
      }
    });

    window.addEventListener("keydown", function(e) {
      const key = e.keyCode;
      if (key === 83) {
        stopMusic();
      }
    });
  };

  const buildShopScreen = () => {
    buildDom(`
      <section id="shop-section" class="container">
        <audio autoplay loop  id="playAudio">
          <source src="music-project-1/A_Cruel_Angel's_Thesis_-_Neon_Genesis_Evangelion_OP_[Piano_Tutorial]_(Synthesia).mp3" allow="autoplay">
        </audio> 
        <div class="container">  
          <h1 class="title">Shop</h1>
          <h2 class="score-text"></h2>
        </div>
        <div class="container shop">
          <div class="container group">
            <img src="./sprites/shop-red-bird.png" />
            <p class="price-word">Price: <span id="red-bird-skin" class="price-text">500</span></p>
            <div class="row-container">
              <img id="red-bird-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
              <img id="red-bird-equip" class="equip-button" src="./sprites/equipbutton.png" />
            </div>
          </div>
          <div class="container group">
            <img src="./sprites/shop-yellow-bird.png" />
            <p class="price-word">Price: <span id="yellow-bird-skin" class="price-text">500</span></p>
            <div class="row-container">
              <img id="yellow-bird-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
              <img id="yellow-bird-equip" class="equip-button" src="./sprites/equipbutton.png" />
            </div>
          </div>
          <div class="container group">
            <img src="./sprites/robot-up-skin.png" />
            <p class="price-word">Price: <span id="robot-skin" class="price-text">500</span></p>
            <div class="row-container">
              <img id="robot-skin-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
              <img id="robot-skin-equip" class="equip-button" src="./sprites/equipbutton.png" />
            </div>
          </div>
          <div class="container group">
            <img src="./sprites/dog-skin-up.png" />
            <p class="price-word">Price: <span id="dog-skin" class="price-text">500</span></p>
            <div class="row-container">
              <img id="dog-skin-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
              <img id="dog-skin-equip" class="equip-button" src="./sprites/equipbutton.png" />
            </div>
          </div>
          </div>
          <div>
            <img id="back-to-main" src="./sprites/bigMenuButton.png" />
          </div>
      </section>
    `);

    let elementDom;

    const getDomElementById = id => () => {
      elementDom = document.getElementById(id);
      checkValue(elementDom, id);
    };

    function checkValue(element, id) {
      let value = element.innerHTML;
      if (bonusCollected >= value) {
        bonusCollected -= value;
        bonusLeft[0].innerHTML = `${bonusCollected} pts`;
        owned.push(id);
      } else {
        alert("Not enough pts, Go play poor!");
      }
    }

    const checkOwned = skinId => () => {
      if (owned.some(e => e === skinId)) {
        changePlayerSkin(skinId);
      } else {
        alert("You don't own that skin!");
      }
    };

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

    const purchaseRobot = document.getElementById("robot-skin-button");
    const equipRobot = document.getElementById("robot-skin-equip");

    const purchaseDog = document.getElementById("dog-skin-button");
    const equipDog = document.getElementById("dog-skin-equip");

    const backButton = document.getElementById("back-to-main");
    backButton.addEventListener("click", buildSplash);

    purchaseRed.addEventListener("click", getDomElementById("red-bird-skin"));
    equipRed.addEventListener("click", checkOwned("red-bird-skin"));

    purchaseYellow.addEventListener("click", getDomElementById("yellow-bird-skin"));
    equipYellow.addEventListener("click", checkOwned("yellow-bird-skin"));

    purchaseRobot.addEventListener("click", getDomElementById("robot-skin"));
    equipRobot.addEventListener("click", checkOwned("robot-skin"));

    purchaseDog.addEventListener("click", getDomElementById("dog-skin"));
    equipDog.addEventListener("click", checkOwned("dog-skin"));
  };

  buildSplash();
};

window.addEventListener("load", main);
