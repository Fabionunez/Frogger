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
}



Obstacles.prototype.draw = function () {
  if (this.row === 1) {
    var obstacleImage = new Image();
    obstacleImage.src = "./img/obstacle1.png";
  } else if (this.row === 2) {
    var obstacleImage = new Image();
    obstacleImage.src = "./img/obstacle2.png";
  } else if (this.row === 3) {
    var obstacleImage = new Image();
    obstacleImage.src = "./img/obstacle3.png";
  } else if (this.row === 4) {
    var obstacleImage = new Image();
    obstacleImage.src = "./img/obstacle4.png";
  }
  this.ctx.drawImage(obstacleImage, this.x, this.y, this.width, this.height);
}



Obstacles.prototype.update = function () {
  this.x = this.x + this.direction * this.speed;
}