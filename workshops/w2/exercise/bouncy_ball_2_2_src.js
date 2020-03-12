/**
 * WARNING: TRY TO FIGURE THE EXERCISES OUT ON YOUR OWN! 
 * ONLY USE MY SOURCE CODE AS A LAST RESORT, GOOD LUCK!
 */

// Configuration for the game
// Other options that can be set in this config:
// https://photonstorm.github.io/phaser3-docs/Phaser.Core.Config.html
let config = {
    type: Phaser.AUTO,
    // width of the game
    width: 800,
    // height fo the game
    height: 450,
    // background color of the game
    backgroundColor: 0x6dc4f2,
    // function names for the default engine events
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    // This options turns off blurring when scaling up
    pixelArt: true,
    physics: {
        // use the arcade physics engine
        default: "arcade",
        arcade: {
            // debug option to show velocity lines and 
            // collision boxes
            debug: false
        }
    }
};

// Create a new Phaser Game
let game = new Phaser.Game(config);
// Declare our variables
let space,
    ball,
    ground,
    pillar,
    scoretext;
let jumping = false;
let keylock = false;
let playing = false;
// Declare a variable to keep score
let score = 0;
// Speed of the game
let speed = 5;

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

/**
 * Create function
 * This function gets executed once after the preload and creates the game scene
 * 
 * Use this function to create and configure all your game elements in the scene
 */
function create() {
    // Add the bouncy ball physics object to the game
    ball = this.physics.add.sprite(100, 360, 'ball');
    // Add the cactus physics object to the game
    pillar = this.physics.add.sprite(1000, 340, 'cactus');
    // scaling the images
    ball.setScale(2);
    pillar.setScale(2);

    // Create and add the ground
    ground = this.add.tileSprite(400, 410, 400, 32, 'ground');
    ground.setScale(2);

    // Collision detection
    this.physics.add.overlap(ball, pillar, gameover, null, this);

    // Add gravity to the ball
    ball.setGravityY(600);
    ball.setCollideWorldBounds(true);

    // Setup the bounds for the world
    this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height - 60);



    space = this
        .input
        .keyboard
        .addKey(Phaser
            .Input
            .Keyboard
            .KeyCodes
            .SPACE);

    // displaying score
    scoretext = this.add.text(400, 50, score, {
        fontFamily: "\"Arial\"",
        fontSize: "50pt"
    });
    // displaying info at the start of the game
    infotext = this.add.text(50, 400, "Press space to start game", {
        fontFamily: "\"Arial\"",
        fontSize: "20pt"
    })
}

/**
 * Main update loop
 * The code in this function gets executed on every game update (default 60 times per second)
 *
 * Use this function for all elements that change overtime
 */
function update() {
    if (playing) {
        if (!jumping) {
            // we can only jump if space is down and isn't locked
            if (space.isDown && !keylock) {
                jump();
                // unlock space
            } else if (space.isUp) {
                keylock = false;
            }
        } else {
            // Check if the ball is back on the ground
            if (ball.body.bottom == this.physics.world.bounds.bottom) {
                dropDown();
            }
        }

        // increase the position on the x-axis by half the speed to make 
        // the ground move in the same direction and speed as the cacti
        ground.tilePositionX += speed / 2;

        // the pillar is past the ball
        if (pillar.x < 0) {
            scoreOnePoint();
        }
    } else {
        // if we are not playing and space is pressed we start the game
        if (space.isDown) {
            playing = true;
            // hiding the infotext when playing
            infotext.visible = false;
            // set the velocity of the pillar
            // the value is in pixels per second
            pillar.setVelocityX(-speed * 60);
        }
    }
}

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

function scoreOnePoint() {
    // Moving the pillar to the other side of the screen
    pillar.setX(1000);
    // Adding a point to the score
    score += 1;
    // update score text
    scoretext.text = score
}

function gameover() {
    // Game is over, so we are not playing
    playing = false;
    // Display the final score
    infotext.text = "Final score " + score + ", press space to start a new game"
    infotext.visible = true
        // reset the game
    resetGame();
}

function resetGame() {
    // score back to one
    score = 0;
    scoretext.text = score;
    // pillar to initial position
    pillar.setPosition(1000, 340);
    // Set pillar velocity to 0
    pillar.setVelocityX(0);
    // Reset player position
    ball.setPosition(100, 360);
}