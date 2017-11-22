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
