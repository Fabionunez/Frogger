# Project's name

## Description

Frogger is a classic arcade game, developed by Konami in 1981. The object of the game is to help your character (the frog) cross from the bottom of the screen to the top.

## MVP (DOM - CANVAS)

The mvp is a game where the player can move and obstacles that can kill him.

## Backlog

- images animated
- levels

## Data structure

game.js

```
Game(){
this.player
this.obstacles
this.floaters
this.canvas
this.ctx
this.gameOver
this.time
this.widthTime
this.xTime
this.music
this.onTheFloater
this.savedFrog1
this.savedFrog2
this.savedFrog3
this.savedFrog4
this.savedFrog5
this.savedFrogImage
this.savedFrogImage.src
this.background
this.background.src
this.lives
this.lives.src
this.bonnusFly
this.bonnusFly.src
this.music
this.music.src
this.music.volume
this.music.loop
this.savedFrogSound
this.savedFrogSound.src
this.savedFrogSound.volume
this.bonusTime
this.timeBetweenBonus
}
this.bonusXPosition
Game.prototype.startLoop()
Game.prototype.clearCanvas()
Game.prototype.drawCanvas()
Game.prototype.updateCanvas()
Game.prototype.printLives()
Game.prototype.printScore()
Game.prototype.timer()
Game.prototype.frogSaved()
Game.prototype.resetPayerPosition()
Game.prototype.checkSavedFrogs()
Game.prototype.createFloaters()
Game.prototype.createObstacles()
Game.prototype.checkCollisionsCanvas()
Game.prototype.checkDrownFrog()
Game.prototype.checkCollistions()
Game.prototype.goWithFloater()
Game.prototype.checkOnFloat()
Game.prototype.loseLive()
Game.prototype.gameWon()
Game.prototype.setGameOverCallback()
Game.prototype.checkIfBonus()
Game.prototype.checkIfRemoveBonus()
Game.prototype.printBonus()
```

obstacles.js

```
Obstacles(){
this.canvas
this.ctx
this.speed
this.width
this.height
this.row
this.direction
this.x
this.y
this.obstacleImage
this.obstacleImage1
this.obstacleImage2
this.obstacleImage3
this.obstacleImage4
this.obstacleImage1.src
this.obstacleImage2.src
this.obstacleImage3.src
this.obstacleImage4.src
}
Obstacles.prototype.draw()
Obstacles.prototype.update()
```

player.js

```
Player(){
this.lives
this.size
this.x
this.y
this.canvas
this.ctx
this.direction
this.score
this.playerImageN
this.playerImageS
this.playerImageE
this.playerImageO
this.playerImageN.src
this.playerImageS.src
this.playerImageE.src
this.playerImageO.src
this.playerImage
}
Player.prototype.draw()
Player.prototype.setDirectionAndMove()
Player.prototype.setLives()
Player.prototype.setScore()
Player.prototype.checkCollisions()
```

floaters.js

```
Floaters(){
this.canvas
this.ctx
this.speed
this.width
this.height
this.row
this.direction
this.x
this.y
this.floaterImage
this.floaterImage.src
}
Floaters.prototype.draw()
Floaters.prototype.update()
```

## States y States Transitions

- main.js

  - buildSplashScreen()

  - buildGameScreen()

    - startLoop()
    - From here you can go to "Game over" or to "Win" screens

  - buildIntroScreen()

  - buildGameOverScreen()

  - buildWinScreen()

## Task

- main
- screen transitions
- intro help page
- game
- loop
- player
- player movement
- obstacles
- player collisions
- floaters
- lives
- timer
- bonus
- save frogs
- Game win
- Game over

## Links

http://www.classicgaming.cc/classics/frogger/about

### Git

Git repository: https://github.com/Fabionunez/Frogger
Git deploy: https://fabionunez.github.io/Frogger/

### Presentation

https://docs.google.com/presentation/d/1kQxkn_fHAXCxm3Y_oycFhSOdnXfjzhHjPSpfeBTx8UU/edit?usp=sharing
