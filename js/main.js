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
    <h1>Frogger</h1>
    <button id="start-button">Start-game</button>
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


    canvasElement.setAttribute("width", "600px");
    canvasElement.setAttribute("height", "700px");


    const game = new Game(canvasElement);

    game.startLoop();

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

  function buildGameOverScreen() {
    let gameOverScreen = `
    <section>
    <h1>Game over</h1>
    <button id="play-again-button">Play again</button>
    </sectiona
    `;

    buildDom(gameOverScreen);

    const playAgainButton = document.getElementById("play-again-button");

    playAgainButton.addEventListener("click", buildGameScreen);
  }

  function buildWinScreen() {
    let winScreen = `
    <section>
      <h1 > You rock! < /h1> <
      button id = "play-again-button" > < /button> <
      /section>`;
    const playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", buildGameScreen);

  }


  buildSplashScreen();
}


// call main function when the page loads
window.addEventListener("load", main);