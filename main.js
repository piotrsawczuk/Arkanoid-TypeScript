"use strict";
exports.__esModule = true;
var ball_1 = require("./ball");
var paddle_1 = require("./paddle");
var brick_1 = require("./brick");
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
var brickColumnCount = 6;
var brickRowCount = 4;
var brickPadding = 3;
var brickOffsetTop = 100;
// var brickOffset = (canvasWidth - (brickColumnCount - 1) * brickPadding - brickWidth * brickColumnCount) / 2;
// var brickWidth = 100;
var brickOffset = 80;
var brickWidth = (exports.canvasWidth - 2 * brickOffset - (brickColumnCount - 1) * brickPadding) / brickColumnCount;
var brickHeight = 30;
exports.bricks = [];
var tempOffsetLeft = brickOffset;
var tempOffsetTop = brickOffsetTop;
for (var i = 0; i < brickColumnCount; i++) {
    exports.bricks[i] = [];
    for (var j = 0; j < brickRowCount; j++) {
        exports.bricks[i][j] = new brick_1.Brick(tempOffsetLeft, tempOffsetTop, brickWidth, brickHeight);
        tempOffsetTop += brickHeight + brickPadding;
    }
    tempOffsetTop = brickOffsetTop;
    tempOffsetLeft += brickWidth + brickPadding;
}
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
    for (var i = 0; i < brickColumnCount; i++) {
        for (var j = 0; j < brickRowCount; j++) {
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
// addEventListener("mousemove", mouseMoveHandler, false);
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
// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddle.x = relativeX - paddle.width/2;
//     }
// }
// var brickRowCount = 3;
// var brickColumnCount = 5;
// var brickWidth = 75;
// var brickHeight = 20;
// var brickPadding = 10;
// var brickOffsetTop = 30;
// var brickOffsetLeft = 30;
// var bricks = [];
// for(let c=0; c<brickColumnCount; c++) {
//     bricks[c] = [];
//     for(let r=0; r<brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0 };
//     }
// }
// function drawBricks() {
//     for(let c=0; c<brickColumnCount; c++) {
//         for(let r=0; r<brickRowCount; r++) {
//             var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
//             var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
//             bricks[c][r].x = brickX;
//             bricks[c][r].y = brickY;
//             ctx.beginPath();
//             ctx.rect(brickX, brickY, brickWidth, brickHeight);
//             ctx.fillStyle = "#0095DD";
//             ctx.fill();
//             ctx.closePath();
//         }
//     }
// }
// function collisionDetection() {
//     for(let c=0; c<brickColumnCount; c++) {
//         for(let r=0; r<brickRowCount; r++) {
//             var b = bricks[c][r];
//             if(b.status == 1) {
//                 if(ball.x > b.x && ball.x < b.x+brickWidth && ball.y > b.y && ball.y < b.y+brickHeight) {
//                     ball.velocityY = -ball.velocityY;
//                     // dy = -dy;
//                     b.status = 0;
//                 }
//             }
//         }
//     }
// }
