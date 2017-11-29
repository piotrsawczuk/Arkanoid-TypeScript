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
