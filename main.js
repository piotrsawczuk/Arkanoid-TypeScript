"use strict";
exports.__esModule = true;
var ball_1 = require("./ball");
var paddle_1 = require("./paddle");
var brick_1 = require("./brick");
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
exports.canvasWidth = canvas.width = window.innerWidth;
exports.canvasHeight = canvas.height = window.innerHeight;
// export var canvasWidth = canvas.width = 800;
// export var canvasHeight = canvas.height = 600;
exports.leftKeyPressed = false;
exports.rightKeyPressed = false;
var gamePaused = false;
// set 2 after tests
var numberOfLives = 2;
exports.lives = numberOfLives;
function decLives() {
    exports.lives--;
}
exports.decLives = decLives;
var startingPoints = 0;
var maxPoints;
exports.points = startingPoints;
function addPoint() {
    exports.points++;
}
exports.addPoint = addPoint;
exports.aSounds = [];
exports.aSounds[1] = new Audio('sounds/Arkanoid SFX (1).wav');
exports.aSounds[2] = new Audio('sounds/Arkanoid SFX (2).wav');
exports.aSounds[3] = new Audio('sounds/Arkanoid SFX (3).wav');
exports.aSounds[4] = new Audio('sounds/Arkanoid SFX (4).wav');
exports.aSounds[5] = new Audio('sounds/Arkanoid SFX (5).wav');
exports.aSounds[6] = new Audio('sounds/Arkanoid SFX (6).wav');
exports.aSounds[7] = new Audio('sounds/Arkanoid SFX (7).wav');
exports.aSounds[8] = new Audio('sounds/Arkanoid SFX (8).wav');
exports.aSounds[9] = new Audio('sounds/Arkanoid SFX (9).wav');
exports.aSounds[10] = new Audio('sounds/Arkanoid SFX (10).wav');
exports.aSounds[11] = new Audio('sounds/Arkanoid SFX (11).wav');
exports.aSounds[12] = new Audio('sounds/Arkanoid SFX (12).wav');
exports.paddle = new paddle_1.Paddle();
var ballRadius = 10;
var ball = new ball_1.Ball(canvas.width / 2, canvas.height - ballRadius - exports.paddle.height, ballRadius);
exports.brickColumnCount = 6;
exports.brickRowCount = 4;
var brickPadding = 5;
var brickOffsetTop = 100;
// var brickOffset = (canvasWidth - (brickColumnCount - 1) * brickPadding - brickWidth * brickColumnCount) / 2;
// var brickWidth = 100;
var brickOffset = 80;
var brickWidth = (exports.canvasWidth - 2 * brickOffset - (exports.brickColumnCount - 1) * brickPadding) / exports.brickColumnCount;
var brickHeight = 30;
exports.bricks = [];
var tempOffsetLeft = brickOffset;
var tempOffsetTop = brickOffsetTop;
for (var i = 0; i < exports.brickColumnCount; i++) {
    exports.bricks[i] = [];
    for (var j = 0; j < exports.brickRowCount; j++) {
        exports.bricks[i][j] = new brick_1.Brick(tempOffsetLeft, tempOffsetTop, brickWidth, brickHeight);
        tempOffsetTop += brickHeight + brickPadding;
    }
    tempOffsetTop = brickOffsetTop;
    tempOffsetLeft += brickWidth + brickPadding;
}
maxPoints = exports.brickColumnCount * exports.brickRowCount;
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
        if (!ball.soundPlayed) {
            ball.playLoseSound(exports.lives);
            ball.playWinSound(exports.points, maxPoints);
        }
        ball.checkIfWin(exports.points, maxPoints);
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
        if (!ball.gameStarted && exports.points >= maxPoints) {
            ctx.textAlign = "center";
            ctx.font = '40px Roboto';
            ctx.fillText("YOU WIN", canvas.width / 2, canvas.height / 2);
            ctx.font = '20px Roboto';
            ctx.fillText("Press SPACEBAR to start new game", canvas.width / 2, (canvas.height / 2) + 50);
        }
        else if (!ball.gameStarted) {
            ctx.textAlign = "center";
            ctx.font = '28px Roboto';
            ctx.fillText("Press SPACEBAR to start", canvas.width / 2, canvas.height / 2);
        }
    }
    for (var i = 0; i < exports.brickColumnCount; i++) {
        for (var j = 0; j < exports.brickRowCount; j++) {
            if (exports.bricks[i][j].active)
                exports.bricks[i][j].draw(ctx);
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
        if (exports.lives < 0 || exports.points >= maxPoints) {
            exports.lives = numberOfLives;
            exports.points = startingPoints;
            for (var i = 0; i < exports.brickColumnCount; i++) {
                for (var j = 0; j < exports.brickRowCount; j++) {
                    exports.bricks[i][j].active = true;
                }
            }
        }
        ball.gameStarted = true;
        ball.soundPlayed = false;
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
            exports.aSounds[4].cloneNode(true).play();
        }
    }
    else if (gamePaused) {
        gamePaused = false;
    }
}
