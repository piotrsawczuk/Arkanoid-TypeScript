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
        this.soundPlayed = true;
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
            this.checkCollisions();
        }
    };
    Ball.prototype.checkIfWin = function (points, maxPoints) {
        if (points >= maxPoints) {
            this.gameStarted = false;
            this.velocityX = this.velocity;
            this.velocityY = -this.velocity;
        }
    };
    Ball.prototype.playWinSound = function (points, maxPoints) {
        if (points >= maxPoints) {
            main_1.aSounds[9].cloneNode(true).play();
            this.soundPlayed = true;
        }
    };
    Ball.prototype.playLoseSound = function (lives) {
        if (lives < 0) {
            main_1.aSounds[11].cloneNode(true).play();
            this.soundPlayed = true;
        }
    };
    Ball.prototype.checkCollisions = function () {
        // right side
        if (this.x + this.radius > main_1.canvasWidth) {
            this.velocityX = -this.velocity;
        }
        // left side
        if (this.x - this.radius < 0) {
            this.velocityX = this.velocity;
        }
        // top
        if (this.y < 0 + this.radius) {
            this.velocityY = this.velocity;
        }
        // below
        if (this.y > main_1.canvasHeight + 50) {
            main_1.decLives();
            this.gameStarted = false;
            this.velocityX = this.velocity;
            this.velocityY = -this.velocity;
            main_1.aSounds[10].cloneNode(true).play();
        }
        else 
        // paddle side
        if (this.y > main_1.canvasHeight - main_1.paddle.height && this.x > main_1.paddle.x && this.x < main_1.paddle.x + main_1.paddle.width) {
            this.velocityX = -this.velocityX;
            main_1.aSounds[2].play();
        }
        else {
            // paddle
            if (this.y > main_1.canvasHeight - this.radius - main_1.paddle.height
                && this.y < main_1.canvasHeight - this.radius
                && this.x > main_1.paddle.x
                && this.x < main_1.paddle.x + main_1.paddle.width) {
                this.velocityY = -this.velocity;
                main_1.aSounds[2].play();
                // going right?
                if (this.velocityX > 0) {
                    if (this.x < (main_1.paddle.x + (main_1.paddle.width / 2))) {
                        this.velocityX = -this.velocity;
                    }
                    else {
                        this.velocityX = this.velocity;
                    }
                }
                else 
                // going left?
                if (this.velocityX < 0) {
                    if (this.x < (main_1.paddle.x + (main_1.paddle.width / 2))) {
                        this.velocityX = -this.velocity;
                    }
                    else {
                        this.velocityX = this.velocity;
                    }
                }
            }
        }
        // bricks
        var brickX;
        var brickY;
        var brickWidth;
        var brickHeight;
        for (var i = 0; i < main_1.brickColumnCount; i++) {
            for (var j = 0; j < main_1.brickRowCount; j++) {
                if (main_1.bricks[i][j].active) {
                    brickX = main_1.bricks[i][j].x;
                    brickY = main_1.bricks[i][j].y;
                    brickWidth = main_1.bricks[i][j].width;
                    brickHeight = main_1.bricks[i][j].height;
                    // // uderzenie od dolu
                    // if (this.x > brickX - this.radius  && this.x < brickX + brickWidth + this.radius 
                    //  && this.y < brickY + brickHeight + this.radius && this.y > brickY + brickHeight - this.radius){
                    //     this.velocityY = -this.velocityY;
                    //     bricks[i][j].active = false;
                    //     addPoint();
                    //     aSounds[1].cloneNode(true).play();
                    // } else
                    // // uderzenie od góry
                    // if (this.x > brickX - this.radius  && this.x < brickX + brickWidth + this.radius 
                    //  && this.y > brickY - this.radius && this.y < brickY + this.radius){
                    //     this.velocityY = -this.velocityY;
                    //     bricks[i][j].active = false;
                    //     addPoint();
                    //     aSounds[1].cloneNode(true).play();
                    // } else
                    // // uderzenie od lewej
                    // if (this.y > brickY - this.radius  && this.y < brickY + brickHeight + this.radius 
                    //  && this.x > brickX - this.radius && this.x < brickX + this.radius){
                    //     this.velocityX = -this.velocityX;
                    //     bricks[i][j].active = false;
                    //     addPoint();
                    //     aSounds[1].cloneNode(true).play();
                    // } else
                    // // uderzenie od prawej
                    // if (this.y > brickY - this.radius  && this.y < brickY + brickHeight + this.radius 
                    //  && this.x < brickX + brickWidth + this.radius && this.x > brickX + brickWidth - this.radius){
                    //     this.velocityX = -this.velocityX;
                    //     bricks[i][j].active = false;
                    //     addPoint();
                    //     aSounds[1].cloneNode(true).play();
                    // }
                    // // do sprawdzenia i poprawy
                    var brickOffset = 5;
                    var thickness = 10;
                    if (this.x + this.radius > brickX && this.x - this.radius < brickX + brickWidth
                        && this.y + this.radius > brickY && this.y - this.radius < brickY + brickHeight) {
                        if (this.y - this.radius < brickY + brickHeight && this.y - this.radius > brickY + brickHeight - thickness
                            && this.x + this.radius > brickX + brickOffset && this.x - this.radius < brickX + brickWidth - brickOffset) {
                            this.velocityY = -this.velocityY;
                            main_1.bricks[i][j].active = false;
                            main_1.addPoint();
                            main_1.aSounds[1].cloneNode(true).play();
                        }
                        else 
                        //Hit was from below the brick
                        if (this.y + this.radius > brickY && this.y + this.radius < brickY + thickness
                            && this.x + this.radius > brickX + brickOffset && this.x - this.radius < brickX + brickWidth - brickOffset) {
                            this.velocityY = -this.velocityY;
                            main_1.bricks[i][j].active = false;
                            main_1.addPoint();
                            main_1.aSounds[1].cloneNode(true).play();
                        }
                        else 
                        //Hit was from above the brick
                        if (this.x + this.radius > brickX && this.x + this.radius < brickX + thickness
                            && this.y + this.radius > brickY + brickOffset && this.y - this.radius < brickY + brickHeight - brickOffset) {
                            this.velocityX = -this.velocityX;
                            main_1.bricks[i][j].active = false;
                            main_1.addPoint();
                            main_1.aSounds[1].cloneNode(true).play();
                        }
                        else 
                        //Hit was on left
                        if (this.x - this.radius < brickX + brickWidth && this.x - this.radius > brickX + brickWidth - thickness
                            && this.y + this.radius > brickY + brickOffset && this.y - this.radius < brickY + brickHeight - brickOffset) {
                            this.velocityX = -this.velocityX;
                            main_1.bricks[i][j].active = false;
                            main_1.addPoint();
                            main_1.aSounds[1].cloneNode(true).play();
                        }
                        //Hit was on right
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
        this.paddleMoveDistance = 10;
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
