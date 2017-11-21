import {canvasWidth, canvasHeight, paddle} from "./main";

export class Ball {
    velocity : number = 5;
    x : number;
    y : number;
    radius : number;
    velocityX : number = this.velocity;
    velocityY : number = -this.velocity;
    //flaga czy przegralo sie

    constructor(x : number, y : number, radius : number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(ctx : any) : void {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    update() : void {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x > canvasWidth - this.radius || this.x < 0 + this.radius) {
            this.velocityX = -this.velocityX;
        }
        if (this.y < 0 + this.radius) {
            this.velocityY = -this.velocityY
        }
        if (this.y > canvasHeight - this.radius - paddle.height && this.x > paddle.x && this.x < paddle.x + paddle.width) {
            this.velocityY = -this.velocityY;
            if (this.x < (paddle.x + paddle.width) / 2) {
                this.velocityX = this.velocityX > 0 ? (-this.velocityX) : (this.velocityX);
            } else {
                this.velocityX = this.velocityX > 0 ? (this.velocityX) : (-this.velocityX);
            }
            // zakoncz gre, ustaw flage konca gry na true
        }
    }
}