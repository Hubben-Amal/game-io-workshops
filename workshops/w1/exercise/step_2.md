---
layout: exercise
title: Configuring the game
next: workshops/w1/exercise/step_3
previous: workshops/w1/exercise/step_1
---

To create a new Phaser Game we call `new Phaser.game(config)` which creates our game scene and initializes all the necessary things in the background.
As argument we give a configuration object (`config`) in which we can specify all the necessary details for our game. 
For our small example we use this configuration:
```javascript
// Configuration object for the game
 let config = {
    type: Phaser.AUTO,
    // width of the game
    width: 800,
    // height of the game
    height: 450,
    // background color of the game
    backgroundColor: 0x6dc4f2,
};

// Create a new Phaser Game
let game = new Phaser.Game(config);
```
We specify the game width, height and background color. 
## Background color
Try changing the background color to another color you like.
The color is specified in the hexadecimal format. 
To get the know the hexadecimal value for a color you can use the <a href="https://www.google.com/search?q=color+picker" target='_blank'>color picker</a> built into Google.
Just copy over the HEX value and replace the `#` with `0x` so Javascript will interpret the value as hexadecimal.  

Copy the code over in your fiddle and when you run it you should see a box appear with the dimensions we specified and with the background color you set.