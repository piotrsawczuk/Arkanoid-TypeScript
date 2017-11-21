"use strict";
exports.__esModule = true;
var ball_1 = require("./ball");
var paddle_1 = require("./paddle");
var canvas = document.querySelector('#canvas');
// canvas.width = window.innerHeight;
exports.canvasWidth = canvas.width = 800;
exports.canvasHeight = canvas.height = 600;
exports.leftKeyPressed = false;
exports.rightKeyPressed = false;
var ctx = canvas.getContext('2d');
exports.paddle = new paddle_1.Paddle();
var ballRadius = 10;
var ball = new ball_1.Ball(canvas.width / 2, canvas.height - ballRadius - exports.paddle.height, ballRadius);
function main() {
    ball.update();
    exports.paddle.update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx);
    exports.paddle.draw(ctx);
    requestAnimationFrame(main);
}
main();
addEventListener("keydown", keyDownHandler, false);
addEventListener("keyup", keyUpHandler, false);
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
