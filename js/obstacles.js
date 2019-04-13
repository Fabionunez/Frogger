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
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);

}
Obstacles.prototype.update = function () {
  this.x = this.x + this.direction * this.speed;

}