"use strict";
exports.__esModule = true;
var ball_1 = require("./ball");
var paddle_1 = require("./paddle");
var canvas = document.querySelector('#canvas');
// export var canvasWidth = canvas.width = window.innerWidth;
// export var canvasHeight = canvas.height = window.innerHeight;
exports.canvasWidth = canvas.width = 800;
exports.canvasHeight = canvas.height = 600;
exports.leftKeyPressed = false;
exports.rightKeyPressed = false;
exports.lives = 2;
function decLives() {
    exports.lives--;
}
exports.decLives = decLives;
var ctx = canvas.getContext('2d');
exports.paddle = new paddle_1.Paddle();
var ballRadius = 10;
var ball = new ball_1.Ball(canvas.width / 2, canvas.height - ballRadius - exports.paddle.height, ballRadius);
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.updateStartPosition();
    ball.update();
    exports.paddle.update();
    ctx.fillStyle = '#3599DD';
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
addEventListener("keydown", keyDownHandler, false);
addEventListener("keyup", keyUpHandler, false);
addEventListener("keypress", spacePressedHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 37)
        exports.leftKeyPressed = true;
    else if (e.keyCode == 39)
        exports.rightKeyPressed = true;
}
function keyUpHandler(e) {
    if (e.keyCode == 37)
        exports.leftKeyPressed = false;
    else if (e.keyCode == 39)
        exports.rightKeyPressed = false;
}
function spacePressedHandler(e) {
    if (e.keyCode == 32) {
        if (exports.lives < 0) {
            exports.lives = 2;
        }
        ball.gameStarted = true;
    }
}
