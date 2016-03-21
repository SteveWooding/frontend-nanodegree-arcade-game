#!/usr/bin/env bash
#
# Use Google's Closure Compiler to compile the JavaScript game files, in the
# right order, to a single optimised file for production deployment.
java -jar ../libs/closure-compiler/compiler.jar \
    --js_output_file=../game.min.js --js ../resources.js \
    --js ../gameentity.js --js ../enemy.js --js ../player.js --js ../gem.js \
    --js ../app.js --js ../engine.js