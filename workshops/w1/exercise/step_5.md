---
layout: page
title: Scoring points
---

So now that we are bouncing we get to the actual purpose of the game: **Scoring points**.
We score one point each time we jump over a pillar.
One small problem though: we are standing still.

## Moving towards the pillar
To move towards the pillar we will use a little trick and actually move the pillar towards us.
We know how to change the position of a game object from the previous step.
But there is actually a simpler way to do this if we are only moving in one direction namely `setX(x)`, so let's use this to make the pillar come to us.
Add this line to your `update` function.

```javascript
pillar.setX(pillar.x - 5);
```
This will make the pillar move towards the ball with a reasonable speed (5 pixels per update or 300 pixels per second, feel free to experiment with this speed).

## Endless pillars

To make the series of pillars endless we will use another trick and just reuse the same pillar by moving it to the other side of the screen when we have jumped over it. 
Also let's use this to simultaneously add a point to our score

```javascript
// Declare a variable to keep score
let score = 0;

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

    // moving pillar towards the ball
    pillar.setX(pillar.x - 5);

    // the pillar is past the ball
    if (pillar.x < 0){
        scoreOnePoint();
    }
}

function scoreOnePoint() {
    // Moving the pillar to the other side of the screen
    pillar.setX(1000);
    // Adding a point to the score
    score += 1;
}
```

## Displaying score
Now we are keeping score but we have no way of knowing what our score is while playing, let's change that by displaying the score on the screen.

Adding text to the screen in Phaser can be done by calling `this.add.text(x, y, text, textOptions)`.
We can create this text object in the `create` function and update it each time we score a point.

```javascript
// declaring the score variable
let scoretext;

// ...

function create() {
    // ...

    // displaying score
    scoretext = this.add.text(
        400, 50, score, { fontFamily: '"Arial"' , fontSize: "50pt"}
    );
} 

// ...

function scoreOnePoint() {
    // Moving the pillar to the other side of the screen
    pillar.setX(1000);
    // Adding a point to the score
    score += 1;
    // update score text
    scoretext.text = score;
}
```


<ul class="pager blog-pager">
    <li class="previous">
    <a href="{{ "workshops/w1/exercise/step_4" | relative_url }}" data-toggle="tooltip" data-placement="top" title="Previous Step">&larr; Previous step</a>
    </li>
    <li class="next">
        <a href="{{ "workshops/w1/exercise/step_6" | relative_url }}" data-toggle="tooltip" data-placement="top" title="Next step">Next step &rarr;</a>
    </li>
</ul>