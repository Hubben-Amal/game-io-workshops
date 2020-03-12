---
layout: exercise
title: Adding physics
next: workshops/w2/exercise/step_3
previous: workshops/w2/exercise/step_1
---

## Enabling physics
Before we are able to use physics we need to enable them in our config.
Add this to the config to enable physics.
```javascript
physics: {
    // use the arcade physics engine
    default: "arcade",
    arcade: {
        // debug option to show velocity lines and 
        // collision boxes
        debug: false
    }
}
```
We use the `arcade` physics engine as it is simple and lightweight, so ideal for our game.
The possible engines are:
* `arcade`: physics with non-rotated rectangles and circles, no complex collision shapes
* `matter`: fully-featured physics engine, not built for games especially but can still be used for them. 
Supports very complex physics, like fluids, chaining of objects, springs.
Is slower to execute as a result of this.
* `impact`: a bit more features than `arcade` like sloped colliders.

### Setting up collision between ball and pillar
Now that we have enabled the physics engine we need to change our ball and pillar to physics objects.
To add a physics object into the game we use the `this.physics.add.sprite(x, y, id)` function.
It works the same way as `this.add.image()` so we can just replace it our code where the ball and pillar are created.

To check for collisions between them we use the `this.physics.add.overlap()` function, where we can set up a function to be called whenever two colliders overlap.
```javascript
// Collision detection
this.physics.add.overlap(ball, pillar, gameover, null, this);
```

### Use velocity to move the pillar
This in of itself is not enough to make the collision work though. 
The collision will not register because we are changing the position of the ball and pillar manually

Instead we should use **velocity**.
This simplifies the movement of te pillar quite a bit as we just need to set the velocity once at the start of the game and the pillar will keep moving until we set the velocity to 0.
We can use the `setVelocity(x, y)`, `setVelocityX(x)`, `setVelocityY(y)` methods of the physics object for this.
Velocity is specified in pixels per second so we need to multiply our `speed` variable by 60 to get the correct velocity value.

This line should be added in the `update` method in the correct spot, keep in mind this should only be set **once** when we start the game.

```javascript
pillar.setVelocityX(-speed * 60);
```

**Also don't forget to delete these lines as they are no longer necessary**
```javascript
if (pillar.x == 100 && ball.y == 370) {
    gameover();
}

// moving pillar towards the ball
pillar.setX(pillar.x - speed);
```

Lastly add this line to the `resetGame` function so the velocity gets set to 0 again when we reset our game
```javascript
pillar.setVelocityX(0);
```
## Bouncing using physics
Collisions are working now, but the game has also become a lot harder.
To make things easier we can change the bounce of the ball now. 
By using gravity and velocity the bounce movement becomes a lot clearer to the player.
This way it is easier to learn the mechanics of the game and to jump the cacti.

### Adding gravity
Enabling gravity can be done in two ways:
* Setting it on a physics object
* Enabling it in the config

We will use the first option as only the ball will be affected by gravity.
We can set the gravity on an object by using the `setGravity()` function.
We also need to enable collision with the world bounds otherwise our ball will just fall out of our world.

```javascript
// Add gravity to the ball
ball.setGravityY(600);
ball.setCollideWorldBounds(true);

// Setup the bounds for the world
this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height - 60);
```

Adding these lines in the `create` function should do the trick.
*Note that we also change the world bounds so the ball will rest on top of the ground.* 

### Jumping correctly
Now we can replace the `jump` and `dropDown` functions as follows:

```javascript
function jump() {
    // set velocity of the ball
    ball.setVelocityY(-500);
    // set jumping state to true so we can only jump once
    jumping = true;
    // lock our spacebar
    keylock = true
}

function dropDown() {
    // after dropping down we can jump again
    jumping = false;
    if (space.isUp) {
        keylock = false;
    }
}
```

We can't really use the `setTimeout` function anymore to call `dropDown` as we don't know exactly when the ball will touch the ground again.
Instead we will just check in the `update` function if the ball rests on the ground and call `dropDown` then:

```javascript
function update() {
    if (playing) {
        if (!jumping) {
            // ...
        } else {
            // Check if the ball is back on the ground
            if (ball.body.bottom == this.physics.world.bounds.bottom) {
                dropDown();
            }
        }
        // ...
    } else {
        // ...
    }
}
```

<a class="btn btn-danger center" type="button" href="../step_2_solution">
If you are stuck you can check out the solution here
</a>