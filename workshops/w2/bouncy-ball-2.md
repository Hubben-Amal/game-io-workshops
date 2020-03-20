--- 
layout: game_page
title: Bouncy Ball 2
src: workshops/w2/bouncy-ball-2.js 
width: 800
height: 450
---
Try to keep jumping over the endless stream of cacti.
## Controls
* **Spacebar**: Jump in the air
* **Arrow key down**: Slam the ball back to the ground
* **Arrow key left**: Move the ball to the left of the screen
* **Arrow key right**: Move the ball to the right of the screen

<!-- Collapse buttons -->
<button class="btn btn-warning" type="button" data-toggle="collapse" data-target="#collapseExample"
aria-expanded="false" aria-controls="collapseExample">
Click here to see source, try to figure things out on your own first!
</button>
<!-- / Collapse buttons -->

{% capture spoiler %}
```javascript
{% include_relative bouncy-ball-2.js %}
```
{% endcapture %}

<!-- Collapsible element -->
<div class="collapse" id="collapseExample">
    {{ spoiler | markdownify }}
</div>