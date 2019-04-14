'use strict'

let Game = function (canvas) {
  this.player = null;
  this.obstacles = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.gameOver = false;
  this.time = 2000;
  this.widthTime = 150;
  this.xTime = 345;
  this.music = "";

}



Game.prototype.startLoop = function () {

  this.player = new Player(this.canvas);
  this.createObstacles();

  this.music = document.createElement("audio");
  this.music.src = ("./src/FroggerArcMainTrack.ogg");
  this.music.play();
  this.music.volume = 0.07;
  this.music.loop = true;

  const loop = () => {

    this.time--;
    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    this.checkCollistions();

    if (this.gameOver === false) {
      window.requestAnimationFrame(loop);
    }

  }
  window.requestAnimationFrame(loop);
}




Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}




Game.prototype.updateCanvas = function () {

  // Update positions obstacles
  this.obstacles.forEach(function (obstacle) {
    obstacle.update();
  });

  // Update background image
  var background = new Image();
  background.src = "./img/background.png";
  this.ctx.drawImage(background, 0, 2, 600, 696);

  // Upcate number of lives
  var lives = new Image();
  lives.src = "./img/frog.png";

  if (this.player.lives === 3) {
    this.ctx.drawImage(lives, 5, 655, 25, 25);
    this.ctx.drawImage(lives, 35, 655, 25, 25);
    this.ctx.drawImage(lives, 65, 655, 25, 25)
  } else if (this.player.lives === 2) {
    this.ctx.drawImage(lives, 5, 655, 25, 25);
    this.ctx.drawImage(lives, 35, 655, 25, 25);
  } else {
    this.ctx.drawImage(lives, 5, 655, 25, 25);
  }

  // Update score points
  this.ctx.fillStyle = "white";
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillText("SCORE: " + this.player.score, 25, 38);

  // Update timer
  this.ctx.fillStyle = "#FFFF03";
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillText("TIME", 500, 680);

  if (this.time < 0) this.loseLive();

  this.ctx.fillStyle = "#21DF01";
  this.widthTime = this.widthTime - (this.widthTime / this.time);
  this.xTime = this.xTime + (this.widthTime / this.time);

  this.ctx.fillRect(this.xTime, 660, this.widthTime, 20);

}






Game.prototype.drawCanvas = function () {
  this.player.draw();
  this.obstacles.forEach(function (obstacle) {
    obstacle.draw();
  });

}





Game.prototype.createObstacles = function () {

  function getXObstacle(canvas, numObstacles, widthObstacles, position) {

    let xObstacle = 0;
    let spacing = 0;
    //console.log(canvas, numObstacles, widthObstacles)
    spacing = (canvas - (numObstacles * widthObstacles)) / (numObstacles - 1);
    //console.log(spacing);

    if (position === 1) {
      xObstacle = 0;
    } else if (position === 2) {
      xObstacle = widthObstacles + spacing;
    } else if (position === 3) {
      xObstacle = widthObstacles * 2 + spacing * 2;
    }

    return xObstacle;
  }

  //initial row 1
  this.obstacles.push(new Obstacles(this.canvas, 3, 1, -1, 37, getXObstacle(this.canvas.width, 3, 37, 1), 540)); // (canvas, speed, row, direction, width, x, y)
  this.obstacles.push(new Obstacles(this.canvas, 3, 1, -1, 37, getXObstacle(this.canvas.width, 3, 37, 2), 540));
  this.obstacles.push(new Obstacles(this.canvas, 3, 1, -1, 37, getXObstacle(this.canvas.width, 3, 37, 3), 540));


  // //initial row 2
  this.obstacles.push(new Obstacles(this.canvas, 1, 2, 1, 33, getXObstacle(this.canvas.width, 3, 33, 1), 490)); // (canvas, speed, row, direction, width, x, y)
  this.obstacles.push(new Obstacles(this.canvas, 1, 2, 1, 33, getXObstacle(this.canvas.width, 3, 33, 2), 490));
  this.obstacles.push(new Obstacles(this.canvas, 1, 2, 1, 33, getXObstacle(this.canvas.width, 3, 33, 3), 490));

  // //initial row 2
  this.obstacles.push(new Obstacles(this.canvas, 1, 3, -1, 33, getXObstacle(this.canvas.width, 3, 33, 1), 440)); // (canvas, speed, row, direction, width, x, y)
  this.obstacles.push(new Obstacles(this.canvas, 1, 3, -1, 33, getXObstacle(this.canvas.width, 3, 33, 2), 440));
  this.obstacles.push(new Obstacles(this.canvas, 1, 3, -1, 33, getXObstacle(this.canvas.width, 3, 33, 3), 440));



  setInterval(() => {
    this.obstacles.push(new Obstacles(this.canvas, 3, 1, -1, 37, getXObstacle(this.canvas.width, 3, 37, 1) + this.canvas.width, 540));
  }, 1000);


  // setInterval(() => {
  //   this.obstacles.push(new Obstacles(this.canvas, 1, 2, 1, 33, getXObstacle(this.canvas.width, 3, 33, 1) - this.canvas.width, 490)); // (canvas, speed, row, direction, width, x, y)

  // }, 1000);

}






Game.prototype.checkCollistions = function () {

  //check collision canvas
  this.player.checkCollisionsCanvas();

  //check collision obstacles
  this.obstacles.forEach((obstacle, index) => {

    const isColliding = this.player.checkCollisionsObstacles(obstacle);

    if (isColliding) {
      this.loseLive();
      if (this.player.lives === 0) {
        this.gameOver = true;
        this.buildGameOverScreen("losse");
        this.music.src = "";
      }
    }

  });

  //check the collision with arrival goal
  if (this.player.y === 340) {
    this.gameOver = true;
    this.buildGameOverScreen("win");
    this.music.src = "";
  }
}





Game.prototype.setGameOverCallback = function (buildGameOverScreen) {
  this.buildGameOverScreen = buildGameOverScreen; // to access to the functions of other file
}




Game.prototype.loseLive = function () {

  this.player.setLives();
  this.player.x = 30000;
  this.player.y = 30000;

  this.loseLiveSound = document.createElement("audio");
  this.loseLiveSound.src = ("./src/sound-frogger-squash.wav");
  this.loseLiveSound.play();
  this.loseLiveSound.volume = 0.1;

  this.widthTime = 150;
  this.xTime = 345;
  this.time = 2000;

  setTimeout(() => {
    this.player.x = 300;
    this.player.y = 590;
  }, 1000)

  if (this.player.lives === 0) {
    this.gameOver = true;
    this.buildGameOverScreen("losse");
  }

}