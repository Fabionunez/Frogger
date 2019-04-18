let Obstacles = function (canvas, speed, row, direction, width, x, y) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.speed = speed;
  this.width = width;
  this.height = 50;
  this.row = row;
  this.direction = direction;
  this.x = x;
  this.y = y;
  this.obstacleImage = new Image();
  this.obstacleImage1 = new Image();
  this.obstacleImage2 = new Image();
  this.obstacleImage3 = new Image();
  this.obstacleImage4 = new Image();
  this.obstacleImage1.src = "./img/obstacle1.png";
  this.obstacleImage2.src = "./img/obstacle2.png";
  this.obstacleImage3.src = "./img/obstacle3.png";
  this.obstacleImage4.src = "./img/obstacle4.png";

}



Obstacles.prototype.draw = function () { // Create diferent images for each row of cars
  if (this.row === 1) {
    this.obstacleImage = this.obstacleImage1;
  } else if (this.row === 2) {
    this.obstacleImage = this.obstacleImage2;
  } else if (this.row === 3) {
    this.obstacleImage = this.obstacleImage3;
  } else if (this.row === 4) {
    this.obstacleImage = this.obstacleImage4;
  }
  this.ctx.drawImage(this.obstacleImage, this.x, this.y, this.width, this.height);

}



Obstacles.prototype.update = function () {
  this.x = this.x + this.direction * this.speed;
}