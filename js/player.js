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

    /**
     * Current position of the player on the x-axis.
     * @type {number}
     */
    this.x = this.INIT_X;

    /**
     * Current position of the player on the y-axis.
     * @type {number}
     */
    this.y = this.INIT_Y;
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
        gem.reset();
        allEnemies.push(new Enemy());  // Add an extra enemy
        this.level++;
        this.renderLevel();
    }
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
    gem.reset();
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
    console.log(this.x, this.y);
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