let Floaters = function (canvas, speed, row, direction, width, x, y) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.speed = speed;
  this.width = width;
  this.height = 50;
  this.row = row;
  this.direction = direction;
  this.x = x;
  this.y = y;
  this.floaterImage = new Image();
  this.floaterImage.src = "./img/floater1.png";
}



Floaters.prototype.draw = function () {
  this.ctx.drawImage(this.floaterImage, this.x, this.y, this.width, this.height);
}



Floaters.prototype.update = function () {
  this.x = this.x + this.direction * this.speed;
}