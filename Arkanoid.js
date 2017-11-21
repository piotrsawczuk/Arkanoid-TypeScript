(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var Ball = /** @class */ (function () {
    function Ball(x, y, radius) {
        this.velocity = 5;
        this.velocityX = this.velocity;
        this.velocityY = -this.velocity;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    Ball.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    Ball.prototype.update = function () {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x > main_1.canvasWidth - this.radius || this.x < 0 + this.radius) {
            this.velocityX = -this.velocityX;
        }
        if (this.y < 0 + this.radius) {
            this.velocityY = -this.velocityY;
        }
        if (this.y > main_1.canvasHeight - this.radius - main_1.paddle.height && this.x > main_1.paddle.x && this.x < main_1.paddle.x + main_1.paddle.width) {
            this.velocityY = -this.velocityY;
            if (this.x < (main_1.paddle.x + main_1.paddle.width) / 2) {
                this.velocityX = this.velocityX > 0 ? (-this.velocityX) : (this.velocityX);
            }
            else {
                this.velocityX = this.velocityX > 0 ? (this.velocityX) : (-this.velocityX);
            }
        }
    };
    return Ball;
}());
exports.Ball = Ball;

},{"./main":2}],2:[function(require,module,exports){
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

},{"./ball":1,"./paddle":3}],3:[function(require,module,exports){
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

},{"./main":2}]},{},[2]);
