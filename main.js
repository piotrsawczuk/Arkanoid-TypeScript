"use strict";
exports.__esModule = true;
var ball_1 = require("./ball");
var paddle_1 = require("./paddle");
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
// export var canvasWidth = canvas.width = window.innerWidth;
// export var canvasHeight = canvas.height = window.innerHeight;
exports.canvasWidth = canvas.width = 800;
exports.canvasHeight = canvas.height = 600;
exports.leftKeyPressed = false;
exports.rightKeyPressed = false;
var gamePaused = false;
var numberOfLives = 2;
exports.lives = numberOfLives;
function decLives() {
    exports.lives--;
}
exports.decLives = decLives;
var startingPoints = 0;
exports.points = startingPoints;
function addPoint() {
    exports.points++;
}
exports.addPoint = addPoint;
exports.paddle = new paddle_1.Paddle();
var ballRadius = 10;
var ball = new ball_1.Ball(canvas.width / 2, canvas.height - ballRadius - exports.paddle.height, ballRadius);
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3599DD';
    if (!gamePaused) {
        ctx.textAlign = "center";
        ctx.font = '20px Roboto';
        ctx.globalAlpha = 0.3;
        ctx.fillText("Press P for pause", canvas.width / 2, 30);
        ctx.globalAlpha = 1;
        ball.updateStartPosition();
        ball.update();
        exports.paddle.update();
    }
    else {
        ctx.textAlign = "center";
        ctx.font = '70px Roboto';
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    }
    ctx.textAlign = "left";
    ctx.font = '20px Roboto';
    ctx.fillText("Points: " + exports.points, 10, 30);
    if (exports.lives < 0) {
        ctx.textAlign = "right";
        ctx.font = '20px Roboto';
        ctx.fillText("Lives: " + 0, canvas.width - 10, 30);
        ctx.textAlign = "center";
        ctx.font = '40px Roboto';
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Roboto';
        ctx.fillText("Press SPACEBAR to start new game", canvas.width / 2, (canvas.height / 2) + 50);
    }
    else {
        ctx.textAlign = "right";
        ctx.font = '20px Roboto';
        ctx.fillText("Lives: " + exports.lives, canvas.width - 10, 30);
        if (!ball.gameStarted) {
            ctx.textAlign = "center";
            ctx.font = '28px Roboto';
            ctx.fillText("Press SPACEBAR to start", canvas.width / 2, canvas.height / 2);
        }
    }
    ball.draw(ctx);
    exports.paddle.draw(ctx);
    requestAnimationFrame(main);
}
main();
addEventListener("keydown", arrowKeyDownHandler, false);
addEventListener("keyup", arrowKeyUpHandler, false);
addEventListener("keypress", spacePressedHandler, false);
addEventListener("keypress", pauseHandler, false);
function arrowKeyDownHandler(e) {
    if (e.keyCode == 37)
        exports.leftKeyPressed = true;
    else if (e.keyCode == 39)
        exports.rightKeyPressed = true;
}
function arrowKeyUpHandler(e) {
    if (e.keyCode == 37)
        exports.leftKeyPressed = false;
    else if (e.keyCode == 39)
        exports.rightKeyPressed = false;
}
function spacePressedHandler(e) {
    if (e.keyCode == 32) {
        if (exports.lives < 0) {
            exports.lives = numberOfLives;
            exports.points = startingPoints;
        }
        ball.gameStarted = true;
    }
}
function pauseHandler(e) {
    if (e.keyCode == 112) {
        togglePause();
    }
}
function togglePause() {
    if (!gamePaused) {
        if (ball.gameStarted) {
            gamePaused = true;
        }
    }
    else if (gamePaused) {
        gamePaused = false;
    }
}
