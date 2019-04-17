'use strict'

let Game = function (canvas) {
  this.player = null;
  this.obstacles = [];
  this.floaters = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.gameOver = false;
  this.time = 500;
  this.widthTime = 150;
  this.xTime = 345;
  this.music = "";
  this.onTheFloater = false;
  this.savedFrog1 = false;
  this.savedFrog2 = false;
  this.savedFrog3 = false;
  this.savedFrog4 = false;
  this.savedFrog5 = false;
  this.music = document.createElement("audio");
  this.music.src = ("./src/FroggerArcMainTrack.ogg");
  this.music.volume = 0.07;
  this.music.loop = true;
}


Game.prototype.frogSaved = function () {
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
    } else if (this.player.x >= 516 && this.player.x <= 600) {
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




Game.prototype.resetPayerPosition = function () {
  this.player.score += 1000;
  this.player.x = 500;
  this.player.y = 30000;

  this.music.src = ("");
  this.savedFrogSound = document.createElement("audio");
  this.savedFrogSound.src = ("./src/sound-frogger-extra.wav");
  this.savedFrogSound.play();
  this.savedFrogSound.volume = 0.1;

  setTimeout(() => {
    this.player.x = 300;
    this.player.y = 590;
  }, 800)

  if (this.gameOver === false) {
    setTimeout(() => {
      this.music.src = ("./src/FroggerArcMainTrack.ogg");
      this.music.play();
      this.music.volume = 0.07;
      this.music.loop = true;
    }, 2800)
  }
  this.widthTime = 150;
  this.xTime = 345;
  this.time = 500;
}


Game.prototype.checkSavedFrogs = function () {

  if (this.savedFrog1) {
    var savedFrog1Image = new Image();
    savedFrog1Image.src = "./img/frog-saved.png";
    this.ctx.drawImage(savedFrog1Image, 22, 92, 50, 50);
  }
  if (this.savedFrog2) {
    var savedFrog2Image = new Image();
    savedFrog2Image.src = "./img/frog-saved.png";
    this.ctx.drawImage(savedFrog2Image, 150, 92, 50, 50);
  }
  if (this.savedFrog3) {
    var savedFrog3Image = new Image();
    savedFrog3Image.src = "./img/frog-saved.png";
    this.ctx.drawImage(savedFrog3Image, 275, 92, 50, 50);
  }
  if (this.savedFrog4) {
    var savedFrog4Image = new Image();
    savedFrog4Image.src = "./img/frog-saved.png";
    this.ctx.drawImage(savedFrog4Image, 401, 92, 50, 50);
  }
  if (this.savedFrog5) {
    var savedFrog5Image = new Image();
    savedFrog5Image.src = "./img/frog-saved.png";
    this.ctx.drawImage(savedFrog5Image, 528, 92, 50, 50);
  }
}




Game.prototype.startLoop = function () {

  // Create objects: Player, cars and floaters
  this.player = new Player(this.canvas);
  this.createObstacles();
  this.createFloaters();

  this.music.play();


  const loop = () => {

    this.time--;
    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    this.frogSaved();
    this.checkDrownFrog();
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

  // Update positions logs
  this.floaters.forEach(function (floater) {
    floater.update();
  });

  // Update background image
  var background = new Image();
  background.src = "./img/background.png";
  this.ctx.drawImage(background, 0, 2, 600, 696);

  this.checkSavedFrogs();

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

  this.ctx.fillRect(this.xTime, 660, this.widthTime, 18);

}




Game.prototype.drawCanvas = function () {

  // Draw obstacles
  this.obstacles.forEach(function (obstacle) {
    obstacle.draw();
  });

  // Draw floaters
  this.floaters.forEach(function (floater) {
    floater.draw();
  });

  // Draw player
  this.player.draw();

}







Game.prototype.createFloaters = function () {

  // (canvas, speed, row, direction, width, x, y)
  for (var i = 0; i < (this.canvas.width / 3) * 200; i += (this.canvas.width / 3)) {
    this.floaters.push(new Floaters(this.canvas, 3, 1, 1, 120, 0 - i, 290));
  }

  for (var i = 0; i < (this.canvas.width / 3) * 200; i += (this.canvas.width / 3)) {
    this.floaters.push(new Floaters(this.canvas, 1.5, 2, -1, 120, 0 + i, 240));
  }

  for (var i = 0; i < (this.canvas.width / 2) * 200; i += (this.canvas.width / 2)) {
    this.floaters.push(new Floaters(this.canvas, 5, 3, 1, 120, 0 - i, 190));
  }

  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    this.floaters.push(new Floaters(this.canvas, 6, 4, -1, 120, 0 + i, 140));
  }
}








Game.prototype.createObstacles = function () {

  // Canvas width divided by the number of obstacles and multiply for 200 (number of elements necesaries to keep up three lives)
  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    // (canvas, speed, row, direction, width, x, y)
    this.obstacles.push(new Obstacles(this.canvas, 6, 1, -1, 37, 0 + i, 540));
  }

  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    this.obstacles.push(new Obstacles(this.canvas, 3, 2, 1, 37, 550 - i, 490));
  }

  for (var i = 0; i < (this.canvas.width / 2.5) * 200; i += (this.canvas.width / 2.5)) {
    this.obstacles.push(new Obstacles(this.canvas, 4, 3, -1, 37, 0 + i, 440));
  }

  for (var i = 0; i < (this.canvas.width / 2) * 200; i += (this.canvas.width / 2)) {
    this.obstacles.push(new Obstacles(this.canvas, 13, 4, 1, 37, 630 - i, 390));
  }
}




Game.prototype.checkCollisionsCanvas = function () {

  if (this.player.x > 550 || this.player.x < 0) {
    this.loseLive();
  }

}


Game.prototype.checkDrownFrog = function () {
  if (this.player.y < 340 && this.player.y >= 140) {
    if (this.checkOnFloat() && this.player.y !== 90) {
      this.loseLive();
    }
  }
}






Game.prototype.checkCollistions = function () {

  //check collision canvas
  this.checkCollisionsCanvas();


  //check collision obstacles
  this.obstacles.forEach((obstacle, index) => {

    const isColliding = this.player.checkCollisions(obstacle);

    if (isColliding) {
      this.loseLive();
    }

  });


  //check the collision with arrival goal
  if (this.savedFrog1 && this.savedFrog2 && this.savedFrog3 && this.savedFrog4 && this.savedFrog5) {
    this.gameOver = true;


    this.buildGameOverScreen("win", this.player.score);
    this.music.src = "";

  }

}




Game.prototype.goWithFloater = function (floater) {
  if (floater.direction === 1) {
    this.player.x += floater.speed;
  } else {
    this.player.x -= floater.speed;
  }
};




Game.prototype.checkOnFloat = function () {

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


Game.prototype.loseLive = function () {

  this.player.setLives();
  this.player.x = 500;
  this.player.y = 30000;

  this.loseLiveSound = document.createElement("audio");
  this.loseLiveSound.src = ("./src/sound-frogger-squash.wav");
  this.loseLiveSound.play();
  this.loseLiveSound.volume = 0.1;

  this.widthTime = 150;
  this.xTime = 345;
  this.time = 1000;

  setTimeout(() => {
    this.player.x = 300;
    this.player.y = 590;
  }, 800)

  if (this.player.lives === 0) {
    this.gameOver = true;
    console.log
    this.buildGameOverScreen("losse", this.player.score);
    this.music.src = ""
  }

}





Game.prototype.setGameOverCallback = function (buildGameOverScreen) {
  this.buildGameOverScreen = buildGameOverScreen; // to access to the functions of other file
}