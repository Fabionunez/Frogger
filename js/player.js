let Player = function (canvas) {
  this.lives = 3;
  this.size = 50;
  this.x = 300;
  this.y = 590; //340 to start in the floaters section
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.direction = "n";
  this.score = 0;
}



Player.prototype.draw = function () {
  var playerImage = new Image();
  playerImage.src = "./img/frog.png";
  this.ctx.drawImage(playerImage, this.x, this.y, this.size, this.size);
}



Player.prototype.setDirectionAndMove = function (direction) {

  this.direction = direction;

  // Player sound in every move
  this.hop = document.createElement("audio");
  this.hop.src = ("./src/sound-frogger-hop.wav");
  this.hop.play();
  this.hop.volume = 0.07;

  // Move player in every direction and ask for the score
  switch (direction) {
    case "n":
      this.y -= this.size;
      this.setScore(10);
      break;
    case "s":
      if (this.y !== 590) { // Player can go more down
        this.y += this.size;
        this.setScore(-10);
      }
      break;
    case "e":
      this.x -= this.size;
      break;
    case "o":
      this.x += this.size;
      break;
  }
}


Player.prototype.setLives = function (live) {
  this.lives--;
}


Player.prototype.setScore = function (points) {
  this.score += points;
}


Player.prototype.checkCollisions = function (element) { //check collisions for obstcles and floaters
  if ((this.x + this.size) > (element.x) && (this.x) < (element.x + element.width) && (this.y + this.size) > (element.y) && (this.y) < (element.y + element.height)) {
    return true;
  } else {
    return false;
  }
}