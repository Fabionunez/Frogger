"use strict";


function main() {

  const mainElement = document.querySelector("main");


  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function buildSplashScreen() {
    let splashScreen = `
    <section>
    <p><img src="./img/logo.png" width="522" height="53"/></p>
    <button id="start-button">START GAME</button>
    </section>`;
    // console.log(splashScreen);
    buildDom(splashScreen);

    const startButton = document.getElementById("start-button")
    startButton.addEventListener("click", buildGameScreen);

  }

  function buildGameScreen() {

    let gameScreen = `
    <section class="game-container">
     <canvas></canvas>
    </section>`;

    buildDom(gameScreen);

    const canvasElement = document.querySelector("canvas");


    canvasElement.setAttribute("width", 600);
    canvasElement.setAttribute("height", 700);


    var game = new Game(canvasElement);



    game.startLoop();


    game.setGameOverCallback(buildGameOverScreen);
    //game.setWinCallBack(buildWinScreen);


    document.addEventListener("keydown", function () {

      if (event.keyCode === 38) {
        game.player.setDirectionAndMove("n");
      } else if (event.keyCode === 40) {
        game.player.setDirectionAndMove("s");
      } else if (event.keyCode === 37) {
        game.player.setDirectionAndMove("e");
      } else if (event.keyCode === 39) {
        game.player.setDirectionAndMove("o");
      }

    });

    // setTimeout(buildGameOverScreen, 3000);

  }

  function buildGameOverScreen(result) {


    if (result === "win") {
      console.log(result);
      var gameOverScreen = `
      <section>
      <h1>You win!</h1>
      <button id="play-again-button">PLAY AGAIN</button>
      </section>
      `;
    } else {
      var gameOverScreen = `
      <section>
      <h1>Game over</h1>
      <button id="play-again-button">PLAY AGAIN</button>
      </section>`;
    }

    buildDom(gameOverScreen);

    var playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", buildGameScreen);
  }

  function buildWinScreen() {
    let WinScreen = `
    <section>
    <h1>You win!</h1>
    <button id="play-again-button2">Play again</button>
    </section>
    `;

    buildDom(WinScreen);

    const playAgainButton2 = document.getElementById("play-again-button2");

    playAgainButton2.addEventListener("click", buildGameScreen);
  }


  buildSplashScreen();
}


// call main function when the page loads
window.addEventListener("load", main);