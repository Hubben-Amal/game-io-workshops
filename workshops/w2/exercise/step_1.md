---
layout: exercise
title: Using sprites
next: workshops/w2/exercise/step_2
previous: workshops/w2/exercise/
---

## Loading a sprite from a url
An image can be loaded into the game engine by the method `this.load.image(id, url)`. 
Where `id` is a string identifier you use to refer to the loaded image later on and `url` is the web location of the image.

The loading of resources usually happens before the start of the game, for this purpose Phaser has a special function called `preload`.
This function will get executed before the `create` function and should be used to load any images, sounds or music into memory.
This function gets hooked up to the game engine in the same way as the `create` and `update` functions.

For this exercise there are some basic images available for the ball, pillar and ground in our game. They can be found in the following locations.

|                                                          | name       | url                                                                        |
| -------------------------------------------------------- | ---------- | -------------------------------------------------------------------------- |
| ![ball](/game-io-workshops/img/bouncy-ball/ball.png)     | **ball**   | https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/ball.png   |
| ![cactus](/game-io-workshops/img/bouncy-ball/cactus.png) | **cactus** | https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/cactus.png |
| ![ground](/game-io-workshops/img/bouncy-ball/ground.png) | **ground** | https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/ground.png |

Now try to create a `preload` function that loads these three sprites into memory using `this.load.image(id, url)` and hook it up in the config variable.
You can find the solution below but first try to figure it out yourself.

<!-- Collapse buttons -->
<button class="btn btn-warning" type="button" data-toggle="collapse" data-target="#collapseExample"
aria-expanded="false" aria-controls="collapseExample">
Click here to see solution
</button>
<!-- / Collapse buttons -->

{% capture spoiler %}
```javascript
let config = {
    // ...
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// ...

/**
 * Preload function 
 * This function gets executed once before the create function
 *
 * Use this function to load all assets (images, music, sounds) into 
 * memory so you can use them later to build your game scene
 */
function preload() {
    // Load the sprites for our game
    this.load.image(
        'ball',
        'https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/ball.png'
    )
    this.load.image(
        'ground',
        'https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/ground.png'
    )
    this.load.image(
        'cactus',
        'https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/cactus.png'
    )
}
```
{% endcapture %}

<!-- Collapsible element -->
<div class="collapse" id="collapseExample">
    {{ spoiler | markdownify }}
</div>

### Placing the sprites in the world
Our sprites are now loaded into memory but they do not exist yet in the actual game.
This is done by the function: `this.add.image(x, y, id);` where `id` is the same string we used to load our images into memory.

We can easily replace the ball and pillar objects by their respective images and move the ball up a bit as the image is bigger than our original circle.
We will also scale our images up by a factor of 2 by using the `setScale(scale)` method of the image to create a pixel art look
```javascript
// Add the bouncy ball image to the game
ball = this.add.image(100, 360, 'ball');
// Add the cactus image where we will bounce over
pillar = this.add.image(1000, 340, 'cactus');

// scaling the images
ball.setScale(2);
pillar.setScale(2);
```

### Pixelart look
But this doesn't immediately work as the images are being blurred by default.
We also need to add the `pixelArt = true` option to our config so the scaling of the images maintains the crisp edges.

```javascript
let config = {
    // ...
    // This options turns off blurring when scaling up
    pixelArt: true,
};
```

The ground will require a bit more work.
### Repeating the ground
The ground spans the entire screen so to fill it all with our one image we need to repeat it accross.
To help us with these kinds of usecases Phaser provides the [`tileSprite`](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.TileSprite.html) class.
This object is created using the `this.add.tileSprite(x, y, width, height, id)` method which repeats the image specified by `id` over the `width` and `height`.

We can now replace the creation of the ground with these lines of code
```javascript
// Create and add the ground
ground = this.add.tileSprite(400, 410, 400, 32, 'ground');
ground.setScale(2);
```

## Make the ground move
The game already looks a lot better, but the collision detection is currently broken (we will fix this in the next step).
First let's make the ground move along with the cactus.
For this we again use a trick to make things easier for us and actually move the position of the image in the `tileSprite` and leave the position of the ground untouched.

Adding this line in the right place in the `update` function should do the trick:
```javascript
// increase the position on the x-axis by half the speed to make 
// the ground move in the same direction and speed as the cacti
ground.tilePositionX += 2.5;
``` 

### Speed variable
The ground is now moving at the same speed as the cacti.
But in doing so we created a potential future bug. 
The speed of the cacti and the ground is related to eachother but now they both are specified separately.
If we decide to change the speed of the game we need to modify our code in two different places, which could create an inconsistency if we forget to change one of them.
To solve this we will move the speed to a variable and use it in the `update` method.

```javascript
// Speed of the game
let speed = 5;

function update(){
    // ...

    // moving pillar towards the ball
    pillar.setX(pillar.x - speed);
    // increase the position on the x-axis by half the speed to make 
    // the ground move in the same direction and speed as the cacti
    ground.tilePositionX += speed / 2;

    // ...
}
```

<a class="btn btn-danger center" type="button" href="../step_1_solution">
If you are stuck you can check out the solution here
</a>
