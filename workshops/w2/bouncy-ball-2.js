/**
 * WARNING: TRY TO FIGURE THE EXERCISES OUT ON YOUR OWN!
 * ONLY USE MY SOURCE CODE AS A LAST RESORT, GOOD LUCK!
 */

// Configuration for the game
// Other options that can be set in this config:
// https://photonstorm.github.io/phaser3-docs/Phaser.Core.Config.html
const config = {
    type: Phaser.AUTO,
    // width of the game
    width: 800,
    // height of the game
    height: 450,
    // the html id of the parent object, 
    // useful to specify where in a webpage the game will be
    parent: 'game-area',
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
        default: 'arcade',
        arcade: {
            // debug option to show velocity lines and
            // collision boxes
            debug: false
        }
    }
};

// Create a new Phaser Game
const game = new Phaser.Game(config);
let scene;

// Objects in the game
let ball, ground;
// UI elements
let scoretext, infotext;
// groups
let clouds, pillars;
// Input objects
let left, right;

let jumping = false;
let playing = false;
// Declare a variable to keep score
let score = 0;
// Speed of the game
let speed = 5;
// Current rotation of the ball
let rotation = 0;
// amount of updates before we level up
const levelThreshold = 1200;
// update counter
let upd = 1;
// add a new pillar next levelup
let pillarspawn = false;
// Async pointer to cloud spawning
let spawner;

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
    );
    this.load.image(
        'ground',
        'https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/ground.png'
    );
    this.load.image(
        'cactus',
        'https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/cactus.png'
    );
    this.load.image(
        'cloud',
        'https://hubben-amal.github.io/game-io-workshops/img/bouncy-ball/cloud.png'
    );
    // Load the audio for the effects
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
    // scaling the ball
    ball.setScale(2);
    // Add gravity to the ball
    ball.setGravityY(600);
    ball.setCollideWorldBounds(true);
    ball.setDragX(20);

    // Create and add the ground
    ground = this.add.tileSprite(400, 418, 400, 32, 'ground');
    ground.setScale(2);
    // Move more to front
    ground.setDepth(1);

    // create a physics group for pillars and clouds
    pillars = this.physics.add.group();
    clouds = this.physics.add.group();
    // Collision detection
    this.physics.add.overlap(ball, pillars, gameover, null, this);
    // Setup the bounds for the world
    this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height - 50);

    // Setup inputs
    this.input.keyboard.on('keydown_SPACE', handleSpace);
    this.input.keyboard.on('keydown_DOWN', slam);
    // we add the keys as well so the default functions of scrolling the page are disabled
    this.input.keyboard.addKey('SPACE');
    this.input.keyboard.addKey('DOWN');

    left = this.input.keyboard.addKey('LEFT');
    right = this.input.keyboard.addKey('RIGHT');

    // displaying score
    scoretext = this.add.text(400, 50, score, {
        fontFamily: '"Arial"',
        fontSize: '50pt',
        color: '#000000'
    });
    scoretext.setDepth(5);
    // displaying info at the start of the game
    infotext = this.add.text(50, 400, 'Press space to start game', {
        fontFamily: '"Arial"',
        fontSize: '20pt'
    });
    infotext.setDepth(5);

    scene = this;
}

/**
 * Spawn method for clouds in the sky
 */
function cloudspawn() {
    // Create a new cloud
    const cl = scene.physics.add.sprite(900, Phaser.Math.RND.between(20, 150), 'cloud');
    cl.setScale(Phaser.Math.RND.between(2, 4));
    // Add to a group
    clouds.add(cl);
    // Random depth and speed
    const depth = Phaser.Math.RND.between(2, 4);
    cl.setVelocityX(-speed * (depth * 2 + 16));
    cl.setDepth(depth);
    // Spawn a new cloud inbetween 1 to 2.5 seconds
    spawner = setTimeout(cloudspawn, Phaser.Math.RND.between(1000, 2500));
}

/**
 * Spawn method for pillars
 */
function createPillar() {
    // Add a new physics object to the game
    const pillar = scene
        .physics
        .add
        .sprite(Phaser.Math.RND.between(800, 1500), 350, 'cactus');
    pillar.setScale(2);
    // Add it to the pillar group
    pillars.add(pillar);
    // Set the velocity
    pillar.setVelocityX(-speed * 60);
}

/**
 * Function that is called each time the spacebar is pressed
 */
function handleSpace() {
    if (playing) {
        if (!jumping) {
            scene.sound.play('jump');
            jump();
        }
    } else {
        playing = true;
        // hiding the infotext when playing
        infotext.visible = false;
        // create a pillar when we start the game
        createPillar();
        // start spawning clouds
        cloudspawn();
    }
}

/**
 * Function that slams the ball back to the ground
 */
function slam() {
    ball.setVelocityY(800);
}

/**
 * Move the ball to the right
 */
function moveRight() {
    ball.setVelocityX(ball.body.velocity.x + 5);
}

/**
 * Move the ball to the left
 */
function moveLeft() {
    ball.setVelocityX(ball.body.velocity.x - 5);
}

/**
 * Main update loop
 * The code in this function gets executed on every game update (default 60 times per second)
 *
 * Use this function for all elements that change overtime
 */
function update() {
    if (playing) {
        upd += 1;
        if (upd % levelThreshold === 0) {
            // Leveling up
            if (pillarspawn) {
                createPillar();
            }
            // One extra pillar will be spawned for each two levelups
            pillarspawn = !pillarspawn;
            // increase the speed
            speed += 0.5;
            pillars.children.each(pillar => pillar.setVelocityX(-speed * 60));
        }
        if (left.isDown) {
            moveLeft();
        }
        if (right.isDown) {
            moveRight();
        }
        // Calculate the rotation of the ball using the speed of the ground and the ball
        rotation += 2 * (speed + ball.body.velocity.x / 60) / 64;
        ball.setRotation(rotation);

        // Check if the ball is back on the ground
        if (ball.body.bottom === this.physics.world.bounds.bottom) {
            jumping = false;
        }

        // increase the position on the x-axis by half the speed to make
        // the ground move in the same direction and speed as the cacti
        ground.tilePositionX += speed / 2;

        pillars.children.each(pillar => {
            // if the pillar is off the screen
            if (pillar.body.right < 0) {
                // Score a point
                this.sound.play('score');
                scoreOnePoint();
                // destroy the pillar that is outside of the screen
                pillar.destroy();
            }
        });
    }
}

function jump() {
    // set velocity of the ball
    ball.setVelocityY(-500);
    // set jumping state to true so we can only jump once
    jumping = true;
}

function scoreOnePoint() {
    // create a new pillar
    createPillar();
    // Adding a point to the score
    score += 1;
    // update score text
    scoretext.text = score;
}

function gameover() {
    this.sound.play('death');
    // Game is over, so we are not playing
    playing = false;
    // Display the final score
    infotext.text = 'Final score ' + score + ', press space to start a new game';
    infotext.visible = true;
    // reset the game
    resetGame();
}

function resetGame() {
    // Update counter back to one
    upd = 1;
    // score back to zero
    score = 0;
    // reset speed
    speed = 5;
    scoretext.text = score;
    // Clear the pillars
    pillars.children.each(pillar => pillar.destroy());
    pillars.clear();
    // Stop the Clouds
    clearTimeout(spawner);
    clouds.children.each(cloud => cloud.destroy());
    clouds.clear();
    // Reset player position
    ball.setPosition(100, 360);
    ball.setVelocity(0, 0);
    ball.setRotation(0);
    rotation = 0;
}