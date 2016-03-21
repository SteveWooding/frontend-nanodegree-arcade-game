/**
 * @fileoverview This file loads either the compiled JavaScript (if in
 * production mode) or the individual source files (if in development
 * mode). See the main README.md file for instructions on how to compile
 * the JavaScript for production deployment.
 */

// Try to load the compiled game JavaScript file.
$.getScript('js/game.min.js').fail(function() {
    // If it is not available, use promises with getScript() to make sure
    // all the required scripts are loaded before running the app and
    // starting the engine. Got this idea from Stack Overflow page:
    // http://stackoverflow.com/questions/11803215.
    $.when(
        $.getScript('js/resources.js'),
        $.getScript('js/gameentity.js'),
        $.getScript('js/enemy.js'),
        $.getScript('js/player.js'),
        $.getScript('js/gem.js'),
        $.Deferred(function(deferred) {
            $(deferred.resolve);
        })
    ).done(function() {
        $.getScript('js/app.js');
        $.getScript('js/engine.js');
    });
});
