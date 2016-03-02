// Game settings for both app.js and engine.js
var settings = {
    width: 505,
    height: 606
};


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set the inital position of the enemy
    this.x = Math.floor(Math.random() * settings.width);
    var possibleYPositions = [65, 148, 231];
    this.y = possibleYPositions[Math.floor(Math.random() *
                                           possibleYPositions.length)];

    // Set the speed of the enemy to be a random value between 20 and 419
    this.speed = Math.floor(Math.random() * 400) + 20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Set the image to use for the player
    this.sprite = 'images/char-boy.png';

    // Store the starting position of the player
    this.INIT_X = 202;
    this.INIT_Y = 405;

    // Define the x and y steps the player is allowed to take
    this.X_STEP = 101;
    this.Y_STEP = 83;

    // Keep track of the level the player is on and set it to 1 initially
    this.level = 1;

    // Keep track of the number of lives a player has and set to an initial value
    this.TOTAL_LIVES = 3;
    this.numLives = this.TOTAL_LIVES;

    // Set the inital position of the player
    this.reset();
};

// Update state of player when wins or loses the a game
Player.prototype.update = function() {
    // If the player makes it to the water, reset their position
    if (this.y < 0) {
        this.reset();
        allEnemies.push(new Enemy());  // Add an extra enemy
        this.level++;
        this.renderLevel();
    }
};

// Reset the player back to the start position
Player.prototype.reset = function() {
    this.x = this.INIT_X;
    this.y = this.INIT_Y;
};

// Player loses a life
Player.prototype.loseLife = function() {
    this.numLives--;
    if (this.numLives === 0) {
        // If the player has no lives left now, reset the game level
        // and number of lives
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

// Handle input from the player
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

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the level number on the canvas
Player.prototype.renderLevel = function() {
    ctx.font = "30px Impact";
    ctx.textAlign = "right";
    ctx.clearRect(300, 10, 205, 38);
    ctx.fillText("Level: " + this.level, settings.width, 40);
};

Player.prototype.renderLives = function() {
    var heartImg = Resources.get('images/Heart.png');
    var heartWidth = heartImg.width * 0.5;
    var heartHeight = heartImg.height * 0.5;
    ctx.clearRect(0, 0, 300, 49);
    for (var n = 0; n < this.numLives; n++) {
        ctx.drawImage(heartImg, n * heartImg.width * 0.5, -20, heartWidth, heartHeight);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy());

// Place the player object in a variable called player
var player = new Player();

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
