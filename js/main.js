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
    <p><img src="./img/logo.png" width="460" height="268"/></p>
    <button id="start-button">START GAME</button>
    </section>`;

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
  }





  function buildGameOverScreen(result, score) {

    if (result === "win") {
      var gameOverScreen = `
      <section>
      <h1>YOU WIN!</h1>
      <p>${score} POINTS</p>
      <button id="play-again-button">PLAY AGAIN</button>
      </section>
      `;
    } else {
      var gameOverScreen = `
      <section>
      <h1>GAME OVER</h1>
      <p>${score} POINTS</p>
      <button id="play-again-button">PLAY AGAIN</button>
      </section>`;
    }

    buildDom(gameOverScreen);

    var playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", buildGameScreen);
  }


  buildSplashScreen(); // Build SplashScreen on load
}


// call main function when the page loads
window.addEventListener("load", main);