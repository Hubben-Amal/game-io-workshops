---
layout: exercise
title: Game Over
next: workshops/w1/exercise/step_7
previous: workshops/w1/exercise/step_5
---

The final piece of the puzzle is to actually check whether the ball touches the pillar to see if the game should be over.

## Non playing state
Firstly we will add a state to the game that indicates that we are not playing so we can display the gameover message.
We will use the space bar to start a new game.
Make these changes in the `create` and `update` functions.

```javascript
// declaring the infotext variable
let infotext;
// declaring the gamestate variable
let playing = false;

// ...

function create() {
    // ...

    // displaying info at the start of the game
    infotext = this.add.text(
        50, 
        400, 
        'Press space to start game', 
        { fontFamily: '"Arial"', fontSize: "20pt"}
    );
} 

// ...

function update() {   
    if (playing) {
        if (!jumping) {
            // we can only jump if space is down and isn't locked
            if (space.isDown && !keylock){
                jump();
            }
            // unlock space
            else if (space.isUp) {
                keylock = false;
            }             
        } 

        // moving pillar towards the ball
        pillar.setX(pillar.x - 5);

        // the pillar is past the ball
        if (pillar.x < 0){
            scoreOnePoint();
        }
    }
    else{
        // if we are not playing and space is pressed we start the game
        if (space.isDown){
            playing = true;
            // hiding the infotext when playing
            infotext.visible = false;
        }
    }
}
```

## Game over
Lastly we will check if the ball touches the pillar and end the game when that is the case.
Also we will reset the game such that the player can restart immediately.

For the collision detection we will use a very simple approach as our game is not too complex.
For bigger games you should probably use the builtin physics functions to check for collisions.

```javascript
// if the pillar is under the ball and the ball is not in the air
if (pillar.x == 100 && ball.y == 370){
    gameover();
}
```
Try to figure out where in the update function to put this collision check. 
Then also add the code that handle the gameover and reset of the gamestate

```javascript
function gameover() {
    // Game is over, so we are not playing
    playing = false;
    // Display the final score
    infotext.text = 'Final score ' + score + ', press space to start a new game';
    infotext.visible = true;
    // reset the game
    resetGame();
}

function resetGame() {
    // score back to one
    score = 0;
    scoretext.text = score;
    // pillar to initial position
    pillar.setPosition(700, 340);
}

``` 

That should be it to get our basic game working.
