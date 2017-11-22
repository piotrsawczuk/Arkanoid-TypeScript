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
