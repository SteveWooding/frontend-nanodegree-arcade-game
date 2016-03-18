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