let Player = function (canvas) {
  this.lives = 3;
  this.size = 50;
  this.x = 300;
  this.y = 590;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.direction = "n";
}

Player.prototype.draw = function () {
  // this.ctx.fillStyle = "greenyellow";
  // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  var playerImage = new Image();
  playerImage.src = "./img/frog.png";
  this.ctx.drawImage(playerImage, this.x, this.y, this.size, this.size);

}

Player.prototype.setDirectionAndMove = function (direction) {

  this.direction = direction;

  if (!this.checkCollisionsCanvas()) {

    //console.log(this.checkCollisionsCanvas(), this.direction, this.x, this.y);
    switch (direction) {
      case "n":
        this.y -= this.size;
        break;
      case "s":
        this.y += this.size;
        break;
      case "e":
        this.x -= this.size;
        break;
      case "o":
        this.x += this.size;
        break;
    }
  }
}
Player.prototype.setLives = function (live) {
  this.lives--;
}
Player.prototype.checkCollisionsObstacles = function (obstacle) {

  const collisionRight = this.x + this.size / 2 > obstacle.x - obstacle.width / 2;
  const collisionLeft = this.x - this.size / 2 < obstacle.x + obstacle.width / 2;
  const collisionTop = this.y - this.size / 2 < obstacle.y + obstacle.width / 2;
  const collisionBottom = this.y + this.size / 2 > obstacle.y - obstacle.width / 2

  return collisionRight && collisionLeft && collisionTop && collisionBottom;


}
Player.prototype.checkCollisionsCanvas = function () {

  let stop = false;

  if (this.direction === "n" && this.y === 340) {
    stop = true;
  } else if (this.direction === "s" && this.y === 590) {
    stop = true;
  } else if (this.direction === "o" && this.x === 550) {
    stop = true;
  } else if (this.direction === "e" && this.x === 0) {
    stop = true;
  }

  return stop; //boolean
}