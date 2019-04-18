'use strict'

let Game = function (canvas, name) {
  this.name = name;
  this.player = null;
  this.obstacles = [];
  this.floaters = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.gameOver = false;
  this.time = 800;
  this.widthTime = 150;
  this.xTime = 345;
  this.music = "";
  this.onTheFloater = false;
  this.savedFrog1 = false;
  this.savedFrog2 = true;
  this.savedFrog3 = true;
  this.savedFrog4 = true;
  this.savedFrog5 = true;
  //Images
  this.savedFrogImage = new Image();
  this.savedFrogImage.src = "./img/frog-saved.png";
  this.background = new Image();
  this.background.src = "./img/background.png";
  this.lives = new Image();
  this.lives.src = "./img/frog.png";
  this.bonnusFly = new Image();
  this.bonnusFly.src = "./img/bonus.png"
  //Sounds
  this.music = document.createElement("audio");
  this.music.src = ("./src/FroggerArcMainTrack.ogg");
  this.music.volume = 0.07;
  this.music.loop = true;
  this.savedFrogSound = document.createElement("audio");
  this.savedFrogSound.src = ("./src/sound-frogger-extra.wav");
  this.savedFrogSound.volume = 0.1;
  // Bonus
  this.bonusTime = Date.now();
  this.timeBetweenBonus = 3000;
  this.bonusXPosition = null;
}


Game.prototype.startLoop = function () { //Loop with requestAnimationFrame

  // Create objects: Player, cars and floaters
  this.player = new Player(this.canvas);
  this.createObstacles();
  this.createFloaters();

  this.music.play();

  const loop = () => {

    this.time--;
    this.clearCanvas(); // clear everything in each frame
    this.updateCanvas(); // repaint everything in each frame
    this.drawCanvas(); // draw the initial player and obstacles
    this.checkSavedFrogs(); // Check if you save frogs and print the happy frog images in their place
    this.frogSaved(); // Check if the player is in the positions to save a frog
    this.checkDrownFrog(); // If the player is in the water area and not in a log, he loses a live
    this.checkCollistions(); //canvas and obstacles
    this.gameWon(); // check if you saved all frogs and send you to the win page
    this.checkWinBonus(); // check if you win a bonus


    if (this.gameOver === false) {
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
}



Game.prototype.clearCanvas = function () { // clean the canvas to repaint it every frame
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}





Game.prototype.drawCanvas = function () { // Draw initial elements

  this.obstacles.forEach(function (obstacle) { // Draw obstacles
    obstacle.draw();
  });

  this.floaters.forEach(function (floater) { // Draw floaters
    floater.draw();
  });

  this.player.draw(); // Draw player

}





Game.prototype.updateCanvas = function () {

  this.obstacles.forEach(function (obstacle) { // Update positions obstacles
    obstacle.update();
  });

  this.floaters.forEach(function (floater) { // Update positions logs
    floater.update();
  });

  this.ctx.drawImage(this.background, 0, 2, 600, 696); // Update background image

  this.printLives(); // Update number of lives

  this.printScore(); // Update score points

  this.timer(); // Update timer and lose live if the time ends

  this.printName();

  if (this.checkIfBonus()) { // Check to print the bonus randomly
    this.printBonus(this.bonusXPosition);
  }
  if (this.checkIfRemoveBonus()) {
    this.removeBonus();
  }
}


Game.prototype.printName = function () {
  this.ctx.fillStyle = "white";
  this.ctx.textAlign = "right";
  this.ctx.font = "20px 'Press Start 2P'";

  this.ctx.fillText(this.name.toUpperCase(), 580, 45);
}


Game.prototype.printLives = function () { // check how many lives you have and print the icons
  if (this.player.lives === 3) {
    this.ctx.drawImage(this.lives, 5, 655, 25, 25);
    this.ctx.drawImage(this.lives, 35, 655, 25, 25);
    this.ctx.drawImage(this.lives, 65, 655, 25, 25)
  } else if (this.player.lives === 2) {
    this.ctx.drawImage(this.lives, 5, 655, 25, 25);
    this.ctx.drawImage(this.lives, 35, 655, 25, 25);
  } else {
    this.ctx.drawImage(this.lives, 5, 655, 25, 25);
  }
}



Game.prototype.printScore = function () { // Print and update score
  this.ctx.fillStyle = "white";
  this.ctx.textAlign = "left";
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillText("SCORE: " + this.player.score, 25, 45);
}



Game.prototype.timer = function () { // print and update the time of each live and kill you if it ends
  this.ctx.fillStyle = "#FFFF03";
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillText("TIME", 500, 680);

  if (this.time < 0) this.loseLive();

  this.ctx.fillStyle = "#21DF01";
  this.widthTime = this.widthTime - (this.widthTime / this.time);
  this.xTime = this.xTime + (this.widthTime / this.time);

  this.ctx.fillRect(this.xTime, 660, this.widthTime, 18);
}




Game.prototype.frogSaved = function () { // Check if the player is in the save positions. If not lose a live
  if (this.player.y === 90) {
    if (this.player.x <= 84) {
      if (this.savedFrog1) {
        this.loseLive();
      } else {
        this.savedFrog1 = true;
        this.resetPayerPosition();
      }
    } else if (this.player.x >= 138 && this.player.x <= 210) {
      if (this.savedFrog2) {
        this.loseLive();
      } else {
        this.savedFrog2 = true;
        this.resetPayerPosition();
      }
    } else if (this.player.x >= 264 && this.player.x <= 337) {
      if (this.savedFrog3) {
        this.loseLive();
      } else {
        this.savedFrog3 = true;
        this.resetPayerPosition();
      }
    } else if (this.player.x >= 391 && this.player.x <= 461) {
      if (this.savedFrog4) {
        this.loseLive();
      } else {
        this.savedFrog4 = true;
        this.resetPayerPosition();
      }
    } else if (this.player.x >= 505 && this.player.x <= 600) {
      if (this.savedFrog5) {
        this.loseLive();
      } else {
        this.savedFrog5 = true;
        this.resetPayerPosition();
      }
    } else {
      this.loseLive();
    }
  }
}





Game.prototype.resetPayerPosition = function () { // Reset player position after saving a frog
  this.player.setScore(1000); // add 1000 points

  //reset the time bar initial status
  this.widthTime = 150;
  this.xTime = 345;
  this.time = 800;

  this.player.x = 300; // reset the initial position of the player
  this.player.y = 30000; // send the player outside the game
  this.music.pause(); // pause the background song
  this.savedFrogSound.play();

  setTimeout(() => { // reset the position after a while
    this.player.y = 590;
  }, 400)

  if (this.gameOver === false) { //resume the background music after the savedFrogSound ends
    setTimeout(() => {
      this.music.play();
    }, 2800)
  }
}



Game.prototype.checkSavedFrogs = function () { // Check if you save frogs and print the image
  if (this.savedFrog1) {
    this.ctx.drawImage(this.savedFrogImage, 22, 92, 50, 50);
  }
  if (this.savedFrog2) {
    this.ctx.drawImage(this.savedFrogImage, 150, 92, 50, 50);
  }
  if (this.savedFrog3) {
    this.ctx.drawImage(this.savedFrogImage, 275, 92, 50, 50);
  }
  if (this.savedFrog4) {
    this.ctx.drawImage(this.savedFrogImage, 401, 92, 50, 50);
  }
  if (this.savedFrog5) {
    this.ctx.drawImage(this.savedFrogImage, 528, 92, 50, 50);
  }
}





Game.prototype.createFloaters = function () { // Create enought floaters in each row for the time in each live

  for (var i = 0; i < (this.canvas.width / 3) * 200; i += (this.canvas.width / 3)) { // control the number of elements of the lane
    this.floaters.push(new Floaters(this.canvas, 3 / 2, 1, 1, 120, 0 - i, 290)); // (canvas, speed, row, direction, width, x, y)
  }

  for (var i = 0; i < (this.canvas.width / 3) * 200; i += (this.canvas.width / 3)) {
    this.floaters.push(new Floaters(this.canvas, 1.5 / 2, 2, -1, 120, 0 + i, 240));
  }

  for (var i = 0; i < (this.canvas.width / 2) * 200; i += (this.canvas.width / 2)) {
    this.floaters.push(new Floaters(this.canvas, 5 / 2, 3, 1, 120, 0 - i, 190));
  }

  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    this.floaters.push(new Floaters(this.canvas, 6 / 2, 4, -1, 120, 0 + i, 140));
  }
}






Game.prototype.createObstacles = function () {

  // Canvas width divided by the number of obstacles and multiply for 200 (number of elements necesaries to keep up three lives)
  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    this.obstacles.push(new Obstacles(this.canvas, 6 / 2, 1, -1, 37, 0 + i, 540)); // (canvas, speed, row, direction, width, x, y)
  }

  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    this.obstacles.push(new Obstacles(this.canvas, 3 / 2, 2, 1, 37, 550 - i, 490));
  }

  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    this.obstacles.push(new Obstacles(this.canvas, 4 / 2, 3, -1, 37, 0 + i, 440));
  }

  for (var i = 0; i < (this.canvas.width / 2) * 200; i += (this.canvas.width / 2)) {
    this.obstacles.push(new Obstacles(this.canvas, 13 / 2, 4, 1, 37, 630 - i, 390));
  }
}




Game.prototype.checkCollisionsCanvas = function () { // If the player collides with the sides, he loses a live
  if (this.player.x > 550 || this.player.x < 0) {
    this.loseLive();
  }
}


Game.prototype.checkDrownFrog = function () { // If the player is in the water and not in a log, he loses a live
  if (this.player.y < 340 && this.player.y >= 140) {
    this.bonusTime = Date.now(); // don't show bonus if you are on logs
    this.bonusXPosition = null;
    if (this.checkOnFloat() && this.player.y !== 90) {
      this.loseLive();
    }
  }
}




Game.prototype.checkCollistions = function () { //check collisions with canvas and obstacles

  //check collision canvas
  this.checkCollisionsCanvas();


  //check collision obstacles
  this.obstacles.forEach((obstacle, index) => {

    const isColliding = this.player.checkCollisions(obstacle);

    if (isColliding) {
      this.loseLive();
    }

  });
}




Game.prototype.goWithFloater = function (floater) { // If the player is on a log, he moves with it
  if (floater.direction === 1) {
    this.player.x += floater.speed;
  } else {
    this.player.x -= floater.speed;
  }
};




Game.prototype.checkOnFloat = function () { // Check if the player is on a log

  let deadFrog = true;

  this.floaters.forEach((floater, index) => {

    const isCollidingFloater = this.player.checkCollisions(floater);

    if (isCollidingFloater) {
      this.goWithFloater(floater);
      deadFrog = false;
    }
  });

  return deadFrog;
}


Game.prototype.loseLive = function () { // Lose a live and reset the live. If you don't have lives, game over


  this.printBonus(3);

  this.player.setLives();
  this.player.x = 500;
  this.player.y = 30000;

  // this.bonusXPosition = null; // Reset the bonus
  // this.bonusTime = Date.now();

  this.loseLiveSound = document.createElement("audio");
  this.loseLiveSound.src = ("./src/sound-frogger-squash.wav");
  this.loseLiveSound.play();
  this.loseLiveSound.volume = 0.1;

  this.widthTime = 150;
  this.xTime = 345;
  this.time = 800;

  setTimeout(() => {
    this.player.x = 300;
    this.player.y = 590;
  }, 400)

  if (this.player.lives === 0) {
    this.gameOver = true;
    this.buildGameOverScreen("losse", this.player.score, this.name);
    this.music.src = ""

  }

}

Game.prototype.gameWon = function () {
  if (this.savedFrog1 && this.savedFrog2 && this.savedFrog3 && this.savedFrog4 && this.savedFrog5) {
    this.player.setScore(1000); // 1000 points for saving the 5 frogs
    this.player.setScore(this.player.lives * 500); //500 points extra for each live you have left
    this.gameOver = true;
    this.buildGameOverScreen("win", this.player.score, this.name);
    this.music.src = "";
  }
}



Game.prototype.setGameOverCallback = function (buildGameOverScreen) {
  this.buildGameOverScreen = buildGameOverScreen; // to access to the functions of other file
}






Game.prototype.checkIfBonus = function () {
  if (Date.now() > this.bonusTime + this.timeBetweenBonus) {
    //this.bonusTime = Date.now();
    if (this.bonusXPosition === null) {
      this.bonusXPosition = Math.floor(Math.random() * 12) + 1; // 50px blocks
    }
    return true;
  }
  return false;
}

Game.prototype.checkIfRemoveBonus = function () {
  if (Date.now() > this.bonusTime + this.timeBetweenBonus * 2) {
    this.bonusTime = Date.now();
    this.bonusXPosition = null;
    return true;
  }
  return false;
}


Game.prototype.printBonus = function (position) {

  this.ctx.drawImage(this.bonnusFly, 50 * position, 340, 50, 50);
}

Game.prototype.removeBonus = function () {
  this.ctx.drawImage(this.bonnusFly, 50, 9000, 50, 50);
}

Game.prototype.checkWinBonus = function () {
  if ((this.bonusXPosition * 50 === this.player.x && this.player.y === 340) && this.player.x !== 0) {
    this.bonusTime = Date.now();
    this.bonusXPosition = null;
    this.player.setScore(200);
    let bonusSound = document.createElement("audio");
    bonusSound.src = ("./src/bonus.mp3");
    bonusSound.volume = 0.07;
    bonusSound.play();
  }
}