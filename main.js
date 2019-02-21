"use strict";
const main = () => {
  let nameHolder;
  let scoreHolder;
  let bonusCollected = 0;
  let skinPlayer = "bluebird-skin";
  let bonusSkin = "coffee-skin-bonus";
  const owned = [];
  let pauseHolder = true;
  let pauseButtonPressed = false;
  let musicHolder = true;

  const buildDom = html => {
    const body = document.querySelector("body");
    body.innerHTML = html;
    return body;
  };

  const buildSplash = () => {
    buildDom(`
    <section class="container splash-section">
      <audio loop  id="playAudio">
        <source src="music-project-1/The best 8-bit music top 100 19 Mega Man 3  NES -- Title.mp3"/>
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
          <p>P to pause game</p>
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

    const musicElement = document.querySelector("audio");

    const playMusic = () => {
      let isPlaying =
        musicElement.currentTime > 0 && !musicElement.paused && !musicElement.ended && musicElement.readyState > 2;

      if (!isPlaying) {
        musicElement.play();
      }
    };

    const splashSection = document.querySelector("section");
    splashSection.addEventListener("mouseover", playMusic);

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
      <audio autoplay loop>
        <source src="music-project-1/Game Over Final Fantasy-[AudioTrimmer.com].mp3"/>
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

    const audioEndGame = new Audio();
    audioEndGame.src = "music-project-1/Game Over Final Fantasy-[AudioTrimmer.com].mp3";

    audioEndGame.play();

    pauseHolder = true;

    const stopMusic = () => {
      audioEndGame.pause();
    };

    const graveyardName = document.getElementById("player-dead-name");
    graveyardName.innerHTML = `${nameHolder}`;

    if (parseInt(localStorage.getItem(nameHolder)) < scoreHolder) {
      localStorage.setItem(nameHolder, scoreHolder);
    }
    console.log(localStorage);

    const scoreSquare = document.getElementsByClassName("score-text")[0];
    scoreSquare.innerHTML = `Total score: ${scoreHolder} pts!`;

    const retryButton = document.getElementsByClassName("start-button");
    retryButton[0].addEventListener("click", stopMusic);
    retryButton[0].addEventListener("click", buildGameScreen);

    const backButton = document.getElementById("back-to-main");
    backButton.addEventListener("click", stopMusic);
    backButton.addEventListener("click", buildSplash);

    scoreHolder = 0;
  };

  const buildGameScreen = () => {
    buildDom(`
    <section class="game-section">
      <div class="clouds">
        <div class="x3">
          <div class="cloud"></div>
        </div>
        <div class="x2">
          <div class="cloud"></div>
        </div>
      </div>
      <img id="pause-button" src="./sprites/pause-button.png"/>
      <img id="sound-button" src="./sprites/sound.png"/>
      <audio autoplay loop  id="play-audio">
        <source src="music-project-1/Gourmet Race 8-BIT - Kirby.mp3" allow="autoplay"/>
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

    let spacebarHolder = false;

    const soundButton = document.getElementById("sound-button");
    const audioGame = document.getElementById("play-audio");
    audioGame.currentTime = 0;

    const startText = document.getElementById("click-to-start");
    const pauseButton = document.getElementById("pause-button");

    const stopMusic = () => {
      if (musicHolder === true) {
        musicHolder = false;
        audioGame.pause();
        audioGame.currentTime = 0;
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

    if (!musicHolder) {
      audioGame.pause();
      music();
    }

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

    canvasElement.style.maxHeight = document.querySelector("section").style.maxHeight;
    canvasElement.style.maxWidth = document.querySelector("section").style.maxWidth;

    const width = document.querySelector(".game-section").offsetWidth;
    const height = document.querySelector(".game-section").offsetHeight;

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);

    const startGame = new Game(canvasElement, skinPlayer, bonusSkin);
    startGame.gameOverCallback(buildGameOverScreen);
    startGame.startLoop();

    const setPlayerDirection = () => {
      if (!pauseButtonPressed) {
        startText.classList.add("hide");
        startGame.pause = false;
        score.pause = false;
        pauseHolder = false;
        if (!pause.classList.contains("hide")) {
          pause.classList.add("hide");
        }
        startGame.player.jump();
      }
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

    const pauseByClick = () => {
      if (startGame.pause === true && startGame.holdPause === false) {
        pause.classList.add("hide");
        startGame.holdPause = true;
        score.holdPause = true;
        startGame.pause = false;
        score.pause = false;
        pauseHolder = false;
        pauseButtonPressed = false;
      } else if (startGame.pause === false && startGame.holdPause === false) {
        pause.classList.remove("hide");
        score.holdPause = true;
        startGame.holdPause = true;
        startGame.pause = true;
        score.pause = true;
        pauseHolder = true;
        pauseButtonPressed = true;
      }

      removePauseHolder();
    };

    const removePauseHolder = () => {
      startGame.holdPause = false;
      score.holdPause = false;
    };

    pauseButton.addEventListener("click", pauseByClick);

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
      if (key === 32) {
        if (spacebarHolder === false) {
          setPlayerDirection();
          spacebarHolder = true;
        }
      }
    });

    window.addEventListener("keyup", function(e) {
      const key = e.keyCode;
      if (key === 80) {
        startGame.holdPause = false;
        score.holdPause = false;
      }
      if (key === 32) {
        spacebarHolder = false;
      }
    });
  };

  const buildShopScreen = () => {
    buildDom(`
      <section id="shop-section" class="container">
        <audio autoplay loop  id="playAudio">
          <source src="music-project-1/Elevator Music.mp3" allow="autoplay"/>
        </audio> 
        <div class="container-row">  
          <h1 class="title">Shop</h1>
          <h2 class="score-text"></h2>
        </div>
        <ul class="container-shop shop">
            <li><div class="container group">
              <img src="./sprites/shop-red-bird.png" />
              <p class="price-word">Price: <span id="redbird-skin" class="price-text">5</span></p>
              <div class="row-container">
                <img id="red-bird-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
                <img id="red-bird-equip" class="equip-button" src="./sprites/equipbutton.png" />
              </div>
            </div></li>
            <li><div class="container group">
              <img src="./sprites/shop-yellow-bird.png" />
              <p class="price-word">Price: <span id="yellowbird-skin" class="price-text">5</span></p>
              <div class="row-container">
                <img id="yellow-bird-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
                <img id="yellow-bird-equip" class="equip-button" src="./sprites/equipbutton.png" />
              </div>
            </div></li>
            <li><div class="container group">
              <img src="./sprites/skins/robot-skin-top.png" />
              <p class="price-word">Price: <span id="robot-skin" class="price-text">5</span></p>
              <div class="row-container">
                <img id="robot-skin-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
                <img id="robot-skin-equip" class="equip-button" src="./sprites/equipbutton.png" />
              </div>
            </div></li>
            <li><div class="container group">
              <img src="./sprites/skins/dog-skin-top.png" />
              <p class="price-word">Price: <span id="dog-skin" class="price-text">5</span></p>
              <div class="row-container">
                <img id="dog-skin-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
                <img id="dog-skin-equip" class="equip-button" src="./sprites/equipbutton.png" />
              </div></li>
            <li><div class="container group">
              <img src="./sprites/skins/bin-skin-bonus.png" />
              <p class="price-word">Price: <span id="bin-skin-bonus" class="price-text">5</span></p>
              <div class="row-container">
                <img id="bin-skin-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
                <img id="bin-skin-equip" class="equip-button" src="./sprites/equipbutton.png" />
              </div>
            </div></li>
            <li><div class="container group">
              <img src="./sprites/skins/roto2-skin-bot.png" />
              <p class="price-word">Price: <span id="roto2-skin" class="price-text">5</span></p>
              <div class="row-container">
                <img id="roto2-skin-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
                <img id="roto2-skin-equip" class="equip-button" src="./sprites/equipbutton.png" />
              </div>
            </div></li>
            <li><div class="container group">
              <img src="./sprites/skins/ghost-skin.png" />
              <p class="price-word">Price: <span id="ghost-skin" class="price-text">5</span></p>
              <div class="row-container">
                <img id="ghost-skin-button" class="purchase-button" src="./sprites/buttonpurchase.png" />
                <img id="ghost-skin-equip" class="equip-button" src="./sprites/equipbutton.png" />
              </div>
            </div></li>
          </ul>
            <img id="back-to-main" src="./sprites/bigMenuButton.png" />
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
        skinPlayer = "bluebird-skin";
      }
    }

    const checkOwnedBonus = skinId => () => {
      if (owned.some(e => e === skinId)) {
        changeBonusSkin(skinId);
      } else {
        alert("You don't own that skin!");
      }
    };

    function changeBonusSkin(skinId) {
      if (bonusSkin !== skinId) {
        bonusSkin = skinId;
      } else {
        bonusSkin = "coffee-skin-bonus";
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

    const purchaseBin = document.getElementById("bin-skin-button");
    const equipBin = document.getElementById("bin-skin-equip");

    const purchaseRoto2 = document.getElementById("roto2-skin-button");
    const equipRoto2 = document.getElementById("roto2-skin-equip");

    const purchaseGhost = document.getElementById("ghost-skin-button");
    const equipGhost = document.getElementById("ghost-skin-equip");

    const backButton = document.getElementById("back-to-main");
    backButton.addEventListener("click", buildSplash);

    purchaseRed.addEventListener("click", getDomElementById("redbird-skin"));
    equipRed.addEventListener("click", checkOwned("redbird-skin"));

    purchaseYellow.addEventListener("click", getDomElementById("yellowbird-skin"));
    equipYellow.addEventListener("click", checkOwned("yellowbird-skin"));

    purchaseRobot.addEventListener("click", getDomElementById("robot-skin"));
    equipRobot.addEventListener("click", checkOwned("robot-skin"));

    purchaseDog.addEventListener("click", getDomElementById("dog-skin"));
    equipDog.addEventListener("click", checkOwned("dog-skin"));

    purchaseBin.addEventListener("click", getDomElementById("bin-skin-bonus"));
    equipBin.addEventListener("click", checkOwnedBonus("bin-skin-bonus"));

    purchaseRoto2.addEventListener("click", getDomElementById("roto2-skin"));
    equipRoto2.addEventListener("click", checkOwned("roto2-skin"));

    purchaseGhost.addEventListener("click", getDomElementById("ghost-skin"));
    equipGhost.addEventListener("click", checkOwned("ghost-skin"));
  };

  buildSplash();
};

window.addEventListener("load", main);
