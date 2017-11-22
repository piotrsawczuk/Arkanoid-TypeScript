(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var Ball = /** @class */ (function () {
    function Ball(x, y, radius) {
        this.velocity = 5;
        this.velocityX = this.velocity;
        this.velocityY = -this.velocity;
        this.gameStarted = false;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.radius = radius;
    }
    Ball.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    Ball.prototype.updateStartPosition = function () {
        if (!this.gameStarted) {
            this.startX = main_1.paddle.x + (main_1.paddle.width / 2);
            this.x = this.startX;
            this.y = this.startY;
        }
    };
    Ball.prototype.update = function () {
        if (this.gameStarted) {
            this.x += this.velocityX;
            this.y += this.velocityY;
            // ściany
            if (this.x > main_1.canvasWidth - this.radius || this.x < 0 + this.radius) {
                this.velocityX = -this.velocityX;
            }
            // sufit
            if (this.y < 0 + this.radius) {
                this.velocityY = -this.velocityY;
            }
            // piłka spadła
            if (this.y > main_1.canvasHeight + 50) {
                main_1.decLives();
                this.gameStarted = false;
                this.velocityX = this.velocity;
                this.velocityY = -this.velocity;
            }
            else 
            // odbicie od ścianki kładki
            if (this.y > main_1.canvasHeight - main_1.paddle.height && this.x > main_1.paddle.x && this.x < main_1.paddle.x + main_1.paddle.width) {
                this.velocityX = -this.velocityX;
            }
            else {
                // odbicie od kładki
                if (this.y > main_1.canvasHeight - this.radius - main_1.paddle.height
                    && this.y < main_1.canvasHeight - this.radius
                    && this.x > main_1.paddle.x
                    && this.x < main_1.paddle.x + main_1.paddle.width) {
                    this.velocityY = -this.velocityY;
                    // gdy leci w prawo
                    if (this.velocityX > 0) {
                        if (this.x < (main_1.paddle.x + (main_1.paddle.width / 2))) {
                            this.velocityX = -this.velocityX;
                        }
                        else {
                            this.velocityX = this.velocityX;
                        }
                    }
                    else 
                    // gdy leci w lewo
                    if (this.velocityX < 0) {
                        if (this.x < (main_1.paddle.x + (main_1.paddle.width / 2))) {
                            this.velocityX = this.velocityX;
                        }
                        else {
                            this.velocityX = -this.velocityX;
                        }
                    }
                }
            }
        }
    };
    return Ball;
}());
exports.Ball = Ball;

},{"./main":3}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Brick = /** @class */ (function () {
    function Brick(x, y, width, height) {
        this.active = true;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Brick.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    };
    Brick.prototype.onCollision = function () {
        this.active = false;
    };
    return Brick;
}());
exports.Brick = Brick;

},{}],3:[function(require,module,exports){
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

},{"./ball":1,"./brick":2,"./paddle":4}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var Paddle = /** @class */ (function () {
    function Paddle() {
        this.width = 120;
        this.height = 20;
        this.x = (main_1.canvasWidth - this.width) / 2;
        this.y = (main_1.canvasHeight - this.height);
        this.paddleMoveDistance = 8;
    }
    Paddle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    };
    Paddle.prototype.update = function () {
        if (main_1.rightKeyPressed && this.x < main_1.canvasWidth - this.width) {
            this.x += this.paddleMoveDistance;
        }
        else if (main_1.leftKeyPressed && this.x > 0) {
            this.x -= this.paddleMoveDistance;
        }
        if (this.x >= main_1.canvasWidth - this.width) {
            this.x = main_1.canvasWidth - this.width;
        }
    };
    return Paddle;
}());
exports.Paddle = Paddle;

},{"./main":3}]},{},[3]);
