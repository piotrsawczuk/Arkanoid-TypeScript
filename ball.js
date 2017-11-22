"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var Ball = /** @class */ (function () {
    //flaga czy przegralo sie
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
        if (this.y > main_1.canvasHeight - main_1.paddle.height && this.x > main_1.paddle.x && this.x < main_1.paddle.x + main_1.paddle.width) {
            this.velocityX = -this.velocityX;
        }
        else {
            if (this.y > main_1.canvasHeight - this.radius - main_1.paddle.height
                && this.y < main_1.canvasHeight - this.radius
                && this.x > main_1.paddle.x
                && this.x < main_1.paddle.x + main_1.paddle.width) {
                this.velocityY = -this.velocityY;
                if (this.velocityX > 0) {
                    if (this.x < (main_1.paddle.x + (main_1.paddle.width / 2))) {
                        this.velocityX = -this.velocityX;
                    }
                    else {
                        this.velocityX = this.velocityX;
                    }
                }
                else if (this.velocityX < 0) {
                    if (this.x < (main_1.paddle.x + (main_1.paddle.width / 2))) {
                        this.velocityX = this.velocityX;
                    }
                    else {
                        this.velocityX = -this.velocityX;
                    }
                }
            }
        }
        // zmienna globalna czy spacja kliknieta, updatuje x i ruszam kladka, po spacji puszczam piłeczke,
        // po przegranej ustawiam flage spacji na false i oczekuje na spacje i odejmuje punkty
        // zakoncz gre, ustaw flage konca gry na true
    };
    return Ball;
}());
exports.Ball = Ball;
