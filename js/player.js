let Player = function (canvas) {
  this.lives = 3;
  this.size = 50;
  this.x = 300;
  this.y = 340; //590
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.direction = "n";
  this.score = 0;
}





Player.prototype.draw = function () {

  var playerImage = new Image();
  playerImage.src = "./img/frog.png";
  this.ctx.drawImage(playerImage, this.x, this.y, this.size, this.size);

  // this.ctx.fillStyle = "greenyellow";
  // this.ctx.fillRect(this.x, this.y, this.size, this.size);

}





Player.prototype.setDirectionAndMove = function (direction) {

  this.direction = direction;

  //if (!this.checkCollisionsCanvas()) {

  this.hop = document.createElement("audio");
  this.hop.src = ("./src/sound-frogger-hop.wav");
  this.hop.play();
  this.hop.volume = 0.07;


  //console.log(this.direction, this.x, this.y);
  switch (direction) {
    case "n":
      this.y -= this.size;
      this.setScore(10)
      break;
    case "s":
      if (this.y !== 590) {
        this.y += this.size;
        this.setScore(-10)
      }
      break;
    case "e":
      this.x -= this.size;
      break;
    case "o":
      this.x += this.size;
      break;
  }
  //}
}




Player.prototype.setLives = function (live) {
  this.lives--;
}




Player.prototype.setScore = function (points) {
  this.score += points;
}




Player.prototype.checkCollisionsObstacles = function (obstacle) {

  const collisionRight = this.x + this.size / 2 > obstacle.x - obstacle.width / 2;
  const collisionLeft = this.x - this.size / 2 < obstacle.x + obstacle.width / 2;
  const collisionTop = this.y - this.size / 2 < obstacle.y + obstacle.height / 2; // before obstacle.width
  const collisionBottom = this.y + this.size / 2 > obstacle.y - obstacle.height / 2

  return collisionRight && collisionLeft && collisionTop && collisionBottom;



}

Player.prototype.checkCollisionsFloaters = function (floater) {

  // const collisionRightFloater = this.x + this.size / 2 > floater.x - floater.width / 2;
  // const collisionLeftFloater = this.x - this.size / 2 < floater.x + floater.width / 2;
  // const collisionTopFloater = this.y - this.size / 2 < floater.y + floater.height / 2;
  // const collisionBottomFloater = this.y + this.size / 2 > floater.y - floater.height / 2;

  // return collisionRightFloater && collisionLeftFloater && collisionTopFloater && collisionBottomFloater;


  //if ((A.x + A.width) >= (B.x) && (A.x) <= (B.x + B.width) && (A.y  +A.height) >= (B.y) && (A.y) <= (B.y + B.height))
  //if ((this.x + this.size) > (floater.x) && (this.x) < (floater.x + floater.width) && (this.y + this.size) > (floater.y) && (this.y) < (floater.y + floater.height)) {

  if ((this.x + this.size) > (floater.x) && (this.x) < (floater.x + floater.width) && (this.y + this.size) > (floater.y) && (this.y) < (floater.y + floater.height)) {


    return true;


  } else {

    return false;
  }



}