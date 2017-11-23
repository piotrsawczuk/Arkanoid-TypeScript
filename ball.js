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
    Ball.prototype.checkCollisions = function () {
        // sides
        if (this.x > main_1.canvasWidth - this.radius || this.x < 0 + this.radius) {
            this.velocityX = -this.velocityX;
        }
        // top
        if (this.y < 0 + this.radius) {
            this.velocityY = -this.velocityY;
        }
        // below
        if (this.y > main_1.canvasHeight + 50) {
            main_1.decLives();
            this.gameStarted = false;
            this.velocityX = this.velocity;
            this.velocityY = -this.velocity;
        }
        else 
        // paddle side
        if (this.y > main_1.canvasHeight - main_1.paddle.height && this.x > main_1.paddle.x && this.x < main_1.paddle.x + main_1.paddle.width) {
            this.velocityX = -this.velocityX;
        }
        else {
            // paddle
            if (this.y > main_1.canvasHeight - this.radius - main_1.paddle.height
                && this.y < main_1.canvasHeight - this.radius
                && this.x > main_1.paddle.x
                && this.x < main_1.paddle.x + main_1.paddle.width) {
                this.velocityY = -this.velocityY;
                // going right?
                if (this.velocityX > 0) {
                    if (this.x < (main_1.paddle.x + (main_1.paddle.width / 2))) {
                        this.velocityX = -this.velocityX;
                    }
                    else {
                        this.velocityX = this.velocityX;
                    }
                }
                else 
                // going left?
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
                    // uderzenie od dolu
                    if (this.x > brickX - this.radius && this.x < brickX + brickWidth + this.radius
                        && this.y < brickY + brickHeight + this.radius && this.y > brickY + brickHeight - this.radius) {
                        this.velocityY = -this.velocityY;
                        main_1.bricks[i][j].active = false;
                        main_1.addPoint();
                    }
                    else 
                    // uderzenie od góry
                    if (this.x > brickX - this.radius && this.x < brickX + brickWidth + this.radius
                        && this.y > brickY - this.radius && this.y < brickY + this.radius) {
                        this.velocityY = -this.velocityY;
                        main_1.bricks[i][j].active = false;
                        main_1.addPoint();
                    }
                    else 
                    // uderzenie od lewej
                    if (this.y > brickY - this.radius && this.y < brickY + brickHeight + this.radius
                        && this.x > brickX - this.radius && this.x < brickX + this.radius) {
                        this.velocityX = -this.velocityX;
                        main_1.bricks[i][j].active = false;
                        main_1.addPoint();
                    }
                    else 
                    // uderzenie od prawej
                    if (this.y > brickY - this.radius && this.y < brickY + brickHeight + this.radius
                        && this.x < brickX + brickWidth + this.radius && this.x > brickX + brickWidth - this.radius) {
                        this.velocityX = -this.velocityX;
                        main_1.bricks[i][j].active = false;
                        main_1.addPoint();
                    }
                    // do sprawdzenia i poprawy
                    // dodać dźwięki
                }
            }
        }
    };
    return Ball;
}());
exports.Ball = Ball;
