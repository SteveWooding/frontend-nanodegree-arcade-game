// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set the inital position of the enemy
    this.x = 200;  // TODO Make appear randomly along the screen
    this.y = 231;  // TODO Make appear randomly on 1 of 3 stone block rows (65, 148 or 231)

    // Set the speed of the enemy
    this.speed = 100; // TODO Make random
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    // When the enemy goes off the screen, wrap it back on the other side of the screen
    if (this.x > 505) {  // TODO Get this from the canvas
        this.x = -101;   // TODO This is the width of the sprite. Can we get this from the sprite?
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy());
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // player.handleInput(allowedKeys[e.keyCode]);
});
