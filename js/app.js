// Game settings for both app.js and engine.js
var settings = {
    width: 505,
    height: 606
};


/**
 * Initialises a game entity object.
 * @class
 * @classdesc Parent class for all game entities.
 */
var GameEntity = function() {

};

/**
 * Draw a game entity (e.g. player, enemy, etc) on the screen.
 */
GameEntity.prototype.render = function() {
    // If this.scale is not given, set it to 1
    this.scale = this.scale || 1;

    if (this.scale === 1) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    else {
        // Scale the sprite, if required.
        var spriteImage = Resources.get(this.sprite);
        var width = spriteImage.width * this.scale;
        var height = spriteImage.height * this.scale;
        ctx.drawImage(spriteImage, this.x, this.y, width, height);
    }
};


/**
 * Initialises an enemy object.
 * @class
 * @classdesc Represents an enemy in the game
 * @extends GameEntity
 */
var Enemy = function() {

    /**
     * Define the image to use for the enemies.
     * @type {string}
     */
    this.sprite = 'images/enemy-bug.png';

    /**
     * Initial position on the x-axis of the enemy.
     * @type {number}
     */
    this.x = Math.floor(Math.random() * settings.width);

    // Set the possible positions of enemies on the y-axis.
    var possibleYPositions = [65, 148, 231];

    /**
     * Initial position on the y-axis of the enemy.
     * @type {number}
     */
    this.y = possibleYPositions[Math.floor(Math.random() *
                                           possibleYPositions.length)];

    /**
     * Set the speed of the enemy to be a random value between 20 and 419.
     * @type {number}
     */
    this.speed = Math.floor(Math.random() * 400) + 20;
};

// Setup Enemy to inherit from GameEntity
Enemy.prototype = Object.create(GameEntity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position, required method for game.
 *
 * @param {number} dt - A time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    // When the enemy goes off the screen, wrap it back on the other side of the screen
    if (this.x > settings.width) {
        // Start the enemy off the left edge of the canvas so it comes on in motion
        this.x = -Resources.get(this.sprite).width;
    }

    // Collision detection with player
    // First check if the enemy is on the same row as the player
    if (this.y + 8 === player.y) {
        // Then check if the enemy and player are close to each other
        if (Math.abs(player.x - this.x) < 80) {
            player.loseLife();
        }
    }
};


/**
 * Initialises a player object
 * @class
 * @classdesc Represents the player in the game
 * @extends GameEntity
 */
var Player = function() {
    /**
     * Set the image to use for the player
     * @type {string}
     */
    this.sprite = 'images/char-boy.png';

    /**
     * Store the starting position of the player (x-coordinate)
     * @type {number}
     */
    this.INIT_X = 202;

    /**
     * Store the starting position of the player (y-coordinate)
     * @type {number}
     */
    this.INIT_Y = 405;

    /**
     * Define the step length in the x direction the player is allowed to take.
     * @type {number}
     */
    this.X_STEP = 101;

    /**
     * Define the step length in the y direction the player is allowed to take.
     * @type {number}
     */
    this.Y_STEP = 83;

    /**
     * Keep track of the level the player is on and set it to 1 initially
     * @type {number}
     */
    this.level = 1;

    /**
     * Total number of lives a player is allowed.
     * @type {number}
     */
    this.TOTAL_LIVES = 3;

    /**
     * Keep track of the number of lives a player has left. Initially set to
     * the total number of lives.
     * @type {number}
     */
    this.numLives = this.TOTAL_LIVES;

    /**
     * Keep track of the highest level the player has achieved. Get this
     * initially from the browser local storage, if supported.
     */
    this.highestLevel = getHighscore();

    // Set the initial position of the player
    this.reset();
};

// Setup Player to inherit from GameEntity
Player.prototype = Object.create(GameEntity.prototype);
Player.prototype.constructor = Player;

/**
 * Update state of player when wins or loses the a game
 */
Player.prototype.update = function() {
    // If the player makes it to the water, reset their position
    if (this.y < 0) {
        this.reset();
        allEnemies.push(new Enemy());  // Add an extra enemy
        this.level++;
        this.renderLevel();
    }
};

/**
 * Reset the player back to the start position
 */
Player.prototype.reset = function() {
    this.x = this.INIT_X;
    this.y = this.INIT_Y;
};

/**
 * Player loses a life. If no lives left, game is reset.
 */
Player.prototype.loseLife = function() {
    this.numLives--;
    if (this.numLives === 0) {
        // If the player has no lives left now, reset the game level
        // and number of lives
        if (this.level > this.highestLevel) {
            this.highestLevel = this.level;
            storeHighscore(this.highestLevel);
        }
        this.level = 1;
        this.numLives = this.TOTAL_LIVES;
        this.renderLevel();

        // Get rid of all the enemies
        var numEnemies = allEnemies.length;
        for (var i = 0; i < numEnemies; i++) {
            allEnemies.pop();
        }

        // Add one back with a new random speed and location
        allEnemies.push(new Enemy());
    }
    this.renderLives();
    this.reset();
};

/**
 * Handle input from the player
 *
 * @param {string} key - One of the 4 arrow keys
 */
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        // Move player one square left, as long as player is on the screen
        if (this.x > 0) {
            this.x -= this.X_STEP;
        }
    }
    else if (key === 'right') {
        // Move player one square right, as long as player is on the screen
        if (this.x < 4 * this.X_STEP) {
            this.x += this.X_STEP;
        }
    }
    else if (key === 'up') {
        if (this.y > 0) {
            this.y -= this.Y_STEP;
        }
    }
    else if (key === 'down') {
        if (this.y < this.INIT_Y) {
            this.y += this.Y_STEP;
        }
    }
};

/**
 * Draw the level number on the canvas
 */
Player.prototype.renderLevel = function() {
    ctx.font = "30px Impact";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.clearRect(300, 10, 205, 38);
    ctx.fillText("Level: " + this.level, settings.width, 40);
};

/**
 * Draw hearts on the screen corresponding to the number of lives the player has left.
 */
Player.prototype.renderLives = function() {
    var heartImg = Resources.get('images/Heart.png');
    var heartWidth = heartImg.width * 0.5;
    var heartHeight = heartImg.height * 0.5;
    ctx.clearRect(0, 0, 300, 49);
    for (var n = 0; n < this.numLives; n++) {
        ctx.drawImage(heartImg, n * heartImg.width * 0.5, -20, heartWidth, heartHeight);
    }
};

/**
 * Draw the high score in the bottom left og the screen.
 */
Player.prototype.renderHighscore = function() {
    ctx.font = "30px Impact";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("Highest Level: " + this.highestLevel, 10, settings.height - 30);
};


/**
 * Initialise a gem object.
 * @class
 * @classdesc Represents a gem in the game.
 */
var Gem = function() {
    /**
     * Define the image to use for the gem.
     * @type {string}
     */
    this.sprite = 'images/Gem Green.png';

    /**
     * Set the scale of the gem sprite.
     * @type {number}
     */
    this.scale = 0.7;

    /**
     * Set the off-screen position on the x-axis.
     * @type {number}
     */
    this.INIT_X = -100;

    /**
     * Set the off-screen position on the y-axis.
     * @type {number}
     */
    this.INIT_Y = -100;

    /**
     * Current position of the gem on the x-axis.
     * @type {number}
     */
    this.x = this.INIT_X;

    /**
     * Current position of the gem on the y-axis.
     * @type {number}
     */
    this.y = this.INIT_Y;

    /**
     * Valid values for this.x (given a scale of 0.7).
     * @type {number}
     */
    this.xValues = [14, 115, 216, 317, 418];

    /**
     * Valid values for this.y (given a scale of 0.7).
     * @type {number}
     */
    this.yValues = [97, 180, 263];
};

// Gem inherits from the GameEntity Class
Gem.prototype = Object.create(GameEntity.prototype);
Gem.prototype.constructor = Gem;


/**
 * Store the high score in browser storage
 */
var storeHighscore = function(highscore) {
    if (typeof(Storage) !== "undefined") {
        localStorage.highscore = highscore;
    }
};


/**
 * Get high score from browser storage
 */
var getHighscore = function() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.highscore) {
            return Number(localStorage.highscore);
        }
        else {
            return 1;
        }
    } else {
        return 1;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy());

// Place the player object in a variable called player
var player = new Player();

// Create a gem object, which will move on and off the screen.
var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Prevent the up and down arrow keys from scrolling the browser window
window.addEventListener('keydown', function(e) {
    if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
    }
});
