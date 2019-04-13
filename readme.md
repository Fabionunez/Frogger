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

```
Game(){
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
Game.prototype.createObstacles()
Game.prototype.checkCollistions()
Game.prototype.setGameOverCallback()
```

Obstacles(){
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
Game.prototype.draw()
Game.prototype.update()

player.js
Player(){
this.lives
this.size
this.x
this.y
this.canvas
this.ctx
this.direction
}
Player.prototype.draw ()
Player.prototype.setDirectionAndMove ()
Player.prototype.setLives ()
Player.prototype.checkCollisionsObstacles ()
Player.prototype.checkCollisionsCanvas ()

## States y States Transitions

- main.js

  - buildSplashScreen()

  - buildGameScreen()

    - startLoop()
    - From here you can go to "Game over" or to "Win" screens

  - buildGameOverScreen()

  - buildWinScreen()

## Task

- main
- screen transitions
- game
- loop
- player
- player movement
- obstacles
- player collisions
- Game win
- Game over

## Links

http://www.classicgaming.cc/classics/frogger/about

### Git

https://github.com/Fabionunez/Frogger

### Slides
