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
