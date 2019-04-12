# Project's name

## Description

Frogger is a classic arcade game, developed by Konami in 1981. The object of the game is to help your character (the frog) cross from the bottom of the screen to the top.

## MVP (DOM - CANVAS)

MVP definition, deliverables.
CANVAS, The mvp is a game where the player can move and obstacles that can kill him.

## Backlog

- score
- timeout
- logs rows
- new win mode
- images static
- images animated
- sounds
- bonus prices
- levels

## Data structure

game.js
function Game(canvas){
this.player
this.obstacles
this.canvas
this.ctx
this.gameOver
}
Game.prototype.startLoop()
Game.prototype.cleanCanvas()
Game.prototype.updateCanvas()
Game.prototype.drawCanvas()
Game.prototype.checkCollistions()
Game.prototype.setGameOverCallback()

function Obstacles (canvas){
this.speed
this.width
this.height
this.row
this.direction
this.canvas
this.ctx
this.x
this.y
}

player.js
function Player(canvas){
this.lives
this.x
this.y
this.canvas
this.ctx
this.direction
}
Player.prototype.draw ()
Player.prototype.update ()
Player.prototype.setDirectionAndMove ()
Player.prototype.setLives ()
Player.prototype.checkCollisionsObstacles ()
Player.prototype.checkCollisionsCanvas ()

## States y States Transitions

- main.js
  - buildDom()
    - addEventListener("click", buildGameScreen)
  - buildSplashScreen()
    - buildDom(html splash screen)
  - buildGameScreen()
    - startLoop()
    - setGameOverCallback(buildGameOverScreen)
    - addEventListener("keydown", function to control directions and movement)
  - buildGameOverScreen()
    - buildDom(html game over screen)
    - addEventListener("click", buildGameScreen)
  - buildWinScreen()
    addEventListener("load", main)

## Task

- main
- screen transitions
- game
- loop
- player
- player movement
- obstacles
- player collisions
- player game over

## Links

http://www.classicgaming.cc/classics/frogger/about

### Git

https://github.com/Fabionunez/Frogger

### Slides
