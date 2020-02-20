---
layout: page
title: Bouncing
---

We have all our elements on the screen but not much is happening yet.
Let's change this by making our ball bounce when we press the spacebar.

## Getting the spacebar
To perform an action when the spacebar is pressed we first need to capture it. 
In Phaser we can get capture any key by calling `this.input.keyboard.addKey(key)`, with `key` the keycode of the required key.
This returns an object we can then use to check if the key is pressed.
These keycodes are included in the engine and the keycode for the spacebar can be found in `Phaser.Input.KeyBoard.KeyCodes.SPACE`.

Putting this all together we can create a capture for the spacebar by adding this line to the `create` function.
**Don't forget to also declare the variable `space` outside of the create function so we can use it in other functions**

```javascript
space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
```

## Checking the state of the spacebar
Now that we have our spacebar we need to check when it is pressed down.
This is available as a boolean as an attribute of the key (`space.isDown`).

But this check needs to happen multiple times as we have no idea when exactly the spacebar will be pressed down and we don't want to miss it.
For this problem we will turn to another default function in Phaser called `update`.
This function is called everytime the game updates, which is 60 times per second. 
This will make sure we won't miss the spacebar being pressed.

To make the ball bounce we will just teleport it up for now by changing its position. 
This can be done via the `setPosition(x, y)` function.
Together this looks like this.

```javascript
/**
* Main update loop
* The code in this function gets executed on every game update (default 60 times per second)
*
* Use this function for all elements that change overtime
*/
function update() {
    if (space.isDown){
        jump();
    }
}

function jump() {
    // jump as in teleport the ball up with 150 pixels
    ball.setPosition(ball.x, ball.y - 150);
}
```
Also update the config object to link to our update function
```javascript
let config = {
    // ...
    // Leave the rest of config untouched and update the 
    // lines under this message

    // Linking script functions to the engine events
    scene: {
        create: create,
        update: update
    }
};
```

## Falling down
The previous code has a serious omission: **There is no falling down yet!**.
So the ball just takes off, faster than you can see.
Let's change this by adding code to drop the ball down after some time and to lock your ability to jump again when you are still in the air.

We will use a simple boolean variable to keep the state whether we are jumping (`true`) or on the ground (`false`). 

```javascript
// Declare jumping state
let jumping = false;

function update() {
    // check first if we aren't already jumping
    if (!jumping && space.isDown) {
        jump();        
    } 
}

function jump() {
    // jump as in teleport the ball up with 150 pixels
    ball.setPosition(ball.x, ball.y - 150);
    // set jumping state to true so we can only jump once
    jumping = true;
    // Javascript construct to call a function in the future
    setTimeout(dropDown, 500);
}

function dropdown() {
    // reset the position of the ball
    ball.setPosition(ball.x, ball.y + 150);
    // after dropping down we can jump again
    jumping = false;
}
```

## Making jumping a bit harder
If we run our script now you might notice that it is very easy to just keep pressing the spacebar to stay in the air perpetually.
To change this we should lock the ability to jump again until the player has released the spacebar.
We can check this by looking at the boolean in `space.isUp`.

The `update` and `jump` functions should now look something like this:

```javascript
// Declare keylock state
let keylock = false

function update() {
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
}

function jump() {
    // jump as in teleport the ball up with 150 pixels
    ball.setPosition(ball.x, ball.y - 150);
    // set jumping state to true so we can only jump once
    jumping = true;
    // lock our spacebar
    keylock = true;
    // Javascript construct to call a function in the future
    setTimeout(dropDown, 500);
}
```

Feel free to experiment with jump height and airtime by changing the values.

<ul class="pager blog-pager">
    <li class="previous">
    <a href="{{ "workshops/w1/exercise/step_3" | relative_url }}" data-toggle="tooltip" data-placement="top" title="Previous Step">&larr; Previous step</a>
    </li>
    <li class="next">
        <a href="{{ "workshops/w1/exercise/step_5" | relative_url }}" data-toggle="tooltip" data-placement="top" title="Next step">Next step &rarr;</a>
    </li>
</ul>