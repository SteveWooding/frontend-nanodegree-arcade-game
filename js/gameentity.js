/**
 * Initialises a game entity object.
 * @class
 * @classdesc Parent abstract class for all game entities.
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
 * Reset the player back to the start position
 */
GameEntity.prototype.reset = function() {
    this.x = this.INIT_X;
    this.y = this.INIT_Y;
};