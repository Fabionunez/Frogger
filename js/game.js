'use strict'

let Game = function (canvas) {
  this.player = null;
  this.obstacles = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.gameOver = false;
}

Game.prototype.startLoop = function () {

  this.player = new Player(this.canvas);

  this.obstacles.push(new Obstacles(this.canvas, 1, 1, -1, 100, 50, 50)); // (canvas, speed, row, direction, width, x, y)



  const loop = () => {
    // if (Math.random() > 0.97) { //3% probability
    //   const randomNumber = Math.random() * this.canvas.height;
    //   //this.enemies.push(new Enemy(this.canvas, randomNumber));
    // }
    // console.log("hi");
    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    // // this.checkCollistions();a
    // // if (this.gameOver === true) {
    // //   //falta algo
    // // }
    // // console.log(this.player.direction)

    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
Game.prototype.updateCanvas = function () {
  this.obstacles.forEach(function (obstacle) {
    obstacle.update();
  });

}
Game.prototype.drawCanvas = function () {
  this.player.draw();
  this.obstacles.forEach(function (obstacle) {
    obstacle.draw();
  });

}
Game.prototype.createObstacles = function () {}
Game.prototype.checkCollistions = function () {
  this.player.checkCollisionsCanvas();
}
Game.prototype.setGameOverCallback = function () {}

Game.prototype.setWinCallBack = function () {}