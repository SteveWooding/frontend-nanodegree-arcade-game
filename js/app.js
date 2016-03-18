// Game settings for both app.js and engine.js
var settings = {
    width: 505,
    height: 606
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
 * Update the gem object.
 */
Gem.prototype.update = function() {
    if (this.x === this.INIT_X) {
        // If the gem is not on screen, make it randomly appear,
        // if move than a certain number of enemies are on the screen.
        if (allEnemies.length > 3 && Math.random() < 0.001) {
            this.x = this.xValues[Math.floor(Math.random() * this.xValues.length)];
            this.y = this.yValues[Math.floor(Math.random() * this.yValues.length)];
        }
    }
    else {
        // Collision detection with player
        if (this.y - 24 === player.y && this.x - 14 === player.x) {
            // Remove an enemy if the player collects the gem and there are
            // more than 3 enemies.
            if (allEnemies.length > 3) {
                allEnemies.pop();
            }
            this.reset();
        }

        // Randomly remove the gem
        if (Math.random() < 0.001) {
            this.reset();
        }
    }
};


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
