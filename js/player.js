let Player = function (canvas) {
  this.lives = 3;
  this.size = 50;
  this.x = canvas.width / 2;
  this.y = 590;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.direction = "n";
}

Player.prototype.draw = function () {
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
  this.ctx.fillStyle = "greenyellow";


}
Player.prototype.update = function () {

}
Player.prototype.setDirectionAndMove = function (direction) {

  this.direction = direction;

  if (!this.checkCollisionsCanvas()) {
    console.log(this.checkCollisionsCanvas(), this.direction, this.x, this.y);
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
Player.prototype.setLives = function () {}
Player.prototype.checkCollisionsObstacles = function () {}
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