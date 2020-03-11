---
layout: exercise
title: Dynamic content
next: workshops/w2/exercise/step_4
previous: workshops/w2/exercise/step_2
---

## More pillars
Currently our game has only one pillar which gets teleported back to his initial position after you pass it.
Let's change this by adding the ability to spawn a new pillar each time and to group the existing pillars.

### Pillar group
We can create a physics group by calling the function `this.physics.add.group()`

```javascript
let pillars;

function create() {
    // ...

    // create a group for our pillars
    pillars = this.physics.add.group();
    // ...

    // We can now just use the group to check for collision
    // all the pillars inside of the group will automatically be checked
    this.physics.add.overlap(ball, pillars, gameover, null, this);
}
```

Now let's move all the code to create a new pillar to its own function:

```javascript
function createPillar() {
    // Add a new physics object to the game
    // The long expression is necessary to access the game scene if we are 
    // outside of the functions that are linked in the config
    pillar = game
        .scene
        .keys
        .default
        .physics
        .add
        .sprite(1000, 340, 'cactus');
    pillar.setScale(2);
    // Add it to the pillar group
    pillars.add(pillar);
    // Set the velocity
    pillar.setVelocityX(-speed * 60);
}
```

And instead of setting the velocity of our pillar when we start the game we will now call this function when we start the game.

### Scoring points
Right now we are only checking if the cacti stored in the `pillar` variable goes off the screen in order to score a point.
Our changes now allow for multiple pillars to exist simultaneously, so this will not work correctly anymore.
We now have to check a bit more thoroughly if the pillars are off the screen:
```javascript
for (let i = 0; i < pillars.children.entries.length; i++) {
    // the pillar is past the screen
    if (pillars.children.entries[i].body.right < 0) {
        scoreOnePoint();
        // destroy the pillar that is outside of the screen
        pillars.children.entries[i].destroy();
    }
}
```
The way we score a point and reset the game will also need to change to support our new way of handling pillars.
```javascript
function scoreOnePoint() {
    // create a new pillar
    createPillar();
    // Adding a point to the score
    score += 1;
    // update score text
    scoretext.text = score
}

function resetGame() {
    // score back to one
    score = 0;
    scoretext.text = score;
    // Clear the pillars
    pillars.clear();
    // Reset player position
    ball.setPosition(100, 360);
    ball.setVelocityY(0);
}
```

## Randomize pillar spawning
To make the pillar spawning less predictable we can use a random generator.
Javascript provides one that can be called via `Math.random()`, but this only returns a random number between 0 and 1.
Phaser provides some extra functions to create randomness, their random generator can be accessed via `Phaser.Math.RND`.
Some of the functions it provides are:
* `between(min, max)`: get a random integer number between and including the `min` and `max` value  
* `shuffle(array)`: shuffles an array
* `pick(array)`: picks a random element from an array

We can now use `between` to randomize the spawn location of the next pillar:

```javascript
pillar = game
    .scene
    .keys
    .default
    .physics
    .add
    .sprite(Phaser.Math.RND.between(800, 1500), 340, 'cactus');
```
