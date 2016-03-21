frontend-nanodegree-arcade-game
===============================

![Screenshot of game](images/screenshot.png)

This is a simple arcade game written in JavaScript. It is one of the projects in
Udacity's Frontend Nanodegree program.

Details of the project can be found in this [guide][1].

The basic game engine and graphics were supplied by Udacity. Game logic and
features such as lives and high score were developed by me.

This repository was cloned from this Udacity [repository][2].
So you can see exactly what was my starting point.

## Required Libraries and Dependencies
You will need a modern web browser that supports HTML5 to play this game.
You also need a keyboard (the arrow keys allow you to move the player around
the screen).

For compiling the JavaScript files you need the Java 7 runtime. The Google
Closure Compiler is supplied for your convenience.

## Project contents
This project consists for the following files:

* `index.html` - load this file in a web browser to play the game
* `js/app.js` - main JS file that instantiates the enemy and player objects
* `js/enemy.js` - defines the Enemy class
* `js/engine.js` - contains the main game loop and manages game rendering
* `js/gameentity.js` - abstract class for all game entities
* `js/gameloader.js` - loads compiled or source JavaScript files
* `js/gem.js` - defines the Gem class for the behavior of gems
* `js/player.js` - defines the Player class
* `js/resources.js` - handles the loading and caching of graphics
* `js/build/compile.sh` - compiles JavaScript files to single optimised file
* `js/libs/closure-complier/` - Google's Closure Compiler is included here
* `images/` - directory containing game graphics
* `css/style.css` - style sheet for the web page holding the game

## Compiling JavaScript files
The game consists of JavaScript source code files in an unoptimised form, with
one class per file. When you are ready to deploy the game into a production
environment (maybe after you've made some changes), it is recommended to compile
the JavaScript files into a single optimised file, which is smaller for users
to download.

To compile the JavaScript on Linux:

```bash
cd js/build
./compile.sh
```

This places the compiled JavaScript file `game.min.js` in the `js/` directory.
If you want to go back to development mode, simply delete this file.

On Windows, take the command in `compile.sh` and run it after changing the
forward slashes for backward slashes.

## How to Run the Project
Load the `index.html` in a modern web browser that supports HTML5, served from
a web server.

If you want to test the game locally and have Python installed, do the following
in the directory where `index.html` is:

```bash
python -m SimpleHTTPServer
```

Then navigate you browser to `0.0.0.0:8000` to test the game.

## Extra features
In going beyond the [instructions][1] I added the following features:

* multiple levels, with each level containing one extra enemy
* a number of lives for the player before starting the game again at level 1
* high score that is saved in the users browser using localStorage

[1]: https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true
[2]: https://github.com/udacity/frontend-nanodegree-arcade-game
