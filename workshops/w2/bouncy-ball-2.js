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
    scoretext,
    clouds,
    pillars;
let jumping = false;
let keylock = false;
let playing = false;
// Declare a variable to keep score
let score = 0;
// Speed of the game
let speed = 5;
let rotation = 0;
let scene = game.scene.keys.default;
let left, right;
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
    this.load.image(
        'cloud',
        'https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/cloud.png'
    )

    this.load.audio('jump', 'https://hubben-amal.github.io/game-io-workshops/sound/bouncy-ball/jump.wav');
    this.load.audio('score', 'https://hubben-amal.github.io/game-io-workshops/sound/bouncy-ball/score.wav');
    this.load.audio('death', 'https://hubben-amal.github.io/game-io-workshops/sound/bouncy-ball/death.wav');
}

/**
 * Create function
 * This function gets executed once after the preload and creates the game scene
 * 
 * Use this function to create and configure all your game elements in the scene
 */
function create() {
    // Add the bouncy ball physics object to the game
    ball = this.physics.add.sprite(100, 380, 'ball');
    // scaling the images
    ball.setScale(2);

    // create a group for our pillars
    pillars = this.physics.add.group();

    clouds = this.physics.add.group();

    // Create and add the ground
    ground = this.add.tileSprite(400, 418, 400, 32, 'ground');
    ground.setScale(2);

    // Collision detection
    this.physics.add.overlap(ball, pillars, gameover, null, this);

    // Add gravity to the ball
    ball.setGravityY(600);
    ball.setCollideWorldBounds(true);
    ball.setDragX(20);

    // Setup the bounds for the world
    this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height - 50);

    this.input.keyboard.on('keydown_SPACE', handleSpace);
    this.input.keyboard.on('keydown_DOWN', slam);
    left = this.input.keyboard.addKey('LEFT');
    right = this.input.keyboard.addKey('RIGHT');

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

let clouder;

function cloudspawn() {
    let cl = game.scene.keys.default.physics.add.sprite(900, Phaser.Math.RND.between(20, 150), 'cloud');
    clouds.add(cl);
    cl.setScale(Phaser.Math.RND.between(2, 4));
    cl.setVelocityX(-speed * Phaser.Math.RND.between(20, 25));
    clouder = setTimeout(cloudspawn, Phaser.Math.RND.between(1000, 2500), cloudspawn)
}

function createPillar() {
    // Add a new physics object to the game
    // The long expression is necessary if we are outside of 
    // the functions that are linked in the config
    pillar = game
        .scene
        .keys
        .default
        .physics
        .add
        .sprite(Phaser.Math.RND.between(800, 1500), 350, 'cactus');
    pillar.setScale(2);
    // Add it to the pillar group
    pillars.add(pillar);
    // Set the velocity
    pillar.setVelocityX(-speed * 60);
}

function handleSpace() {
    scene = game.scene.keys.default;
    if (playing) {
        if (!jumping) {
            scene.sound.play('jump')
            jump();
        }

    } else {
        playing = true;
        // hiding the infotext when playing
        infotext.visible = false;
        // create a pillar when we start the game
        createPillar();
        cloudspawn();
    }
}

function slam() {
    ball.setVelocityY(800);
}

function moveRight() {
    ball.setVelocityX(ball.body.velocity.x + 5);
}

function moveLeft() {
    ball.setVelocityX(ball.body.velocity.x - 5);
}

let levelThreshold = 1200;
let upd = 1;
let pillarspawn = false;

/**
 * Main update loop
 * The code in this function gets executed on every game update (default 60 times per second)
 *
 * Use this function for all elements that change overtime
 */
function update() {
    if (playing) {
        upd += 1;
        if (upd % levelThreshold == 0) {
            console.log('levelup');
            if (pillarspawn) {
                createPillar();
            }
            pillarspawn = !pillarspawn;

            speed += .5;
        }
        if (left.isDown) {
            moveLeft();
        }
        if (right.isDown) {
            moveRight();
        }
        rotation += 2 * (speed + ball.body.velocity.x / 60) / 64;
        ball.setRotation(rotation);

        // Check if the ball is back on the ground
        if (ball.body.bottom == this.physics.world.bounds.bottom) {
            jumping = false;
        }

        // increase the position on the x-axis by half the speed to make 
        // the ground move in the same direction and speed as the cacti
        ground.tilePositionX += speed / 2;

        for (let i = 0; i < pillars.children.entries.length; i++) {
            // the pillar is past the screen
            if (pillars.children.entries[i].body.right < 0) {
                this.sound.play('score')
                scoreOnePoint();
                // destroy the pillar that is outside of the screen
                pillars.children.entries[i].destroy();
            }
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


function scoreOnePoint() {
    // create a new pillar
    createPillar();
    // Adding a point to the score
    score += 1;
    // update score text
    scoretext.text = score
}

function gameover() {
    this.sound.play('death')
        // Game is over, so we are not playing
    playing = false;
    // Display the final score
    infotext.text = "Final score " + score + ", press space to start a new game";
    infotext.visible = true;
    // reset the game
    resetGame();
}

function resetGame() {
    upd = 1;
    // score back to one
    score = 0;
    speed = 5;
    scoretext.text = score;
    // Clear the pillars
    pillars.clear();
    clouds.clear();
    clearTimeout(clouder);
    // Reset player position
    ball.setPosition(100, 360);
    ball.setVelocityY(0);
}