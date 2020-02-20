---
layout: page
title: Creating game objects
---

Now that we have created our game it is time to add some objects to it. 
The game we will be making will be a ball jumping over a never ending series of pillars.

## Creating the bouncy ball
To create the bouncy ball we will use the function `this.add.circle(x, y, radius, color)`.
A function provided by the game engine to quickly create a circle at the specified coordinates with a certain radius and color.
**Keep in mind that the x and y coordinates specified will be used as the center of your circle.** 

## Creating the ground and pillars
For the ground and pillars we will use rectangles with the function `this.add.rectangle(x, y, width, height, color)`.
**Keep in mind that the x and y coordinates specified will be used as the center of your rectangle.** 

## The `create` function
Phaser has a specific function reserved for initialization code like this called `create`. 
This function will be called at the beginning of the loading of the game and will only be executed once to create the necessary objects of your game.

Putting this all together gives us this codeblock we will need to add to our existing code:

```javascript
// Declare our variables
let ball, ground, pillar;

/**
* Create function
* This function gets executed once and creates the game scene
* 
* Use this function to create and configure all your game elements 
* in the scene
*/
function create() {
    // Create and add the bouncy ball
    ball = this.add.circle(100, 370, 20, 0x931f9c);
    // Create and add the ground
    ground = this.add.rectangle(400, 420, 800, 60, 0x38963c);
    // Create and add the pillar where we will bounce over
    pillar = this.add.rectangle(700, 340, 50, 100, 0xff0000);
}
```

Running this will not give any results as Phaser does not yet know you want to call the `create` function.
To link everything together we need to add something to our `config`

```javascript
let config = {
    // ...
    // Leave the rest of config untouched and add the 
    // lines under this message

    // Linking script functions to the engine events
    scene: {
        create: create,
    }
};
```

Now you should see a ball resting on top of the ground with a pillar in the distance.
Feel free to experiment with colors, positions and sizes of the elements.

<ul class="pager blog-pager">
    <li class="previous">
    <a href="{{ "workshops/w1/exercise/step_2" | relative_url }}" data-toggle="tooltip" data-placement="top" title="Previous Step">&larr; Previous step</a>
    </li>
    <li class="next">
        <a href="{{ "workshops/w1/exercise/step_4" | relative_url }}" data-toggle="tooltip" data-placement="top" title="Next step">Next step &rarr;</a>
    </li>
</ul>