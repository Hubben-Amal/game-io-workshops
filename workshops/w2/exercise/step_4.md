---
layout: exercise
title: What's next?
previous: workshops/w2/exercise/step_3
---
## Sounds
Loading sounds into the game is similar to the loading of images, we use the function `this.load.audio(key, url)` to load sounds into the game.
To play a sound we use `this.sound.play(key)`.

I have prepared some sounds for you to use:

| Sound     | url                                                                         |
| --------- | --------------------------------------------------------------------------- |
| **jump**  | https://hubben-amal.github.io/game-io-workshops/sound/bouncy-ball/jump.wav  |
| **score** | https://hubben-amal.github.io/game-io-workshops/sound/bouncy-ball/score.wav |
| **death** | https://hubben-amal.github.io/game-io-workshops/sound/bouncy-ball/death.wav |

## Moving clouds in the background
I prepared one other sprite for this exercise:

|                                                        | name      | url                                                                       |
| ------------------------------------------------------ | --------- | ------------------------------------------------------------------------- |
| ![cloud](/game-io-workshops/img/bouncy-ball/cloud.png) | **cloud** | https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/cloud.png |

We can use this cloud to make the background a little bit more interesting.
Try adding some clouds in the background using the random functions.
Then let them move using `setPosition` or `setVelocity`.
**Note that for velocity to work the clouds will need to be physics objects.**
Think about what happens to clouds who go off screen and the spawning of new clouds.
Use a lower speed than the ground to create a [parallax](https://en.wikipedia.org/wiki/Parallax) effect.

## Ramping difficulty
Now that we separated the pillar spawning and have grouped them together we are all set to allow for more pillars to exist at the same time.
Think about how to spawn more and more pillars closer together over time.

## Rolling ball
An image can be rotated via its methods `setAngle(degrees)` or `setRotation(radians)`.
We can use this to make our ball roll over the ground.
If you remember your circle mathematics you should be able to derive the rotation speed from the speed of the ground.


<a class="btn btn-danger center" type="button" href="../../bouncy-ball-2">
See an example of what is possible!
</a>