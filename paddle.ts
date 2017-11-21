import {canvasWidth, canvasHeight, leftKeyPressed, rightKeyPressed} from "./main";

export class Paddle {
    width : number = 120;
    height : number = 20;
    x : number = (canvasWidth - this.width ) / 2;
    y : number = (canvasHeight - this.height);
    paddleMoveDistance : number = 8;

    draw(ctx : any) : void {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }

    update() : void {
        if (rightKeyPressed && this.x < canvasWidth - this.width) {
            this.x += this.paddleMoveDistance;
        }
        else if (leftKeyPressed && this.x > 0) {
            this.x -= this.paddleMoveDistance;
        }
        if (this.x >= canvasWidth - this.width) {
            this.x = canvasWidth - this.width;
        }
    }
}