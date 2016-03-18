// Game settings for both app.js and engine.js
var settings = {
    width: 505,
    height: 606
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
