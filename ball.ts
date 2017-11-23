import {canvasWidth, canvasHeight, paddle, decLives, addPoint, brickColumnCount, brickRowCount, bricks} from './main';

export class Ball {
    velocity : number = 5;
    startX : number;
    startY : number;
    x : number;
    y : number;
    radius : number;
    velocityX : number = this.velocity;
    velocityY : number = -this.velocity;
    gameStarted : boolean = false;

    constructor(x : number, y : number, radius : number) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.radius = radius;
    }

    draw(ctx : any) : void {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    updateStartPosition() : void {
        if (!this.gameStarted) {
            this.startX = paddle.x + (paddle.width / 2);
            this.x = this.startX;
            this.y = this.startY;
        }
    }

    update() : void {
        if (this.gameStarted) {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.checkCollisions();
        }
    }

    checkIfWin(points : number, maxPoints : number) : void {
        if (points >= maxPoints) {
            this.gameStarted = false;
            this.velocityX = this.velocity;
            this.velocityY = -this.velocity;
        }
    }

    checkCollisions() : void {
        // sides
        if (this.x > canvasWidth - this.radius || this.x < 0 + this.radius) {
            this.velocityX = -this.velocityX;
        }
        // top
        if (this.y < 0 + this.radius) {
            this.velocityY = -this.velocityY;
        }
        // below
        if (this.y > canvasHeight + 50) {
            decLives();
            this.gameStarted = false;
            this.velocityX = this.velocity;
            this.velocityY = -this.velocity;
        } else
        // paddle side
        if (this.y > canvasHeight - paddle.height && this.x > paddle.x && this.x < paddle.x + paddle.width) {
            this.velocityX = -this.velocityX;
        } else {
            // paddle
            if (this.y > canvasHeight - this.radius - paddle.height
                && this.y < canvasHeight - this.radius
                && this.x > paddle.x 
                && this.x < paddle.x + paddle.width
            ) {
                this.velocityY = -this.velocityY;
                // going right?
                if (this.velocityX > 0) {
                    if (this.x < (paddle.x + (paddle.width / 2))) {
                        this.velocityX = -this.velocityX;
                    } else {
                        this.velocityX = this.velocityX;
                    }
                } else
                // going left?
                if (this.velocityX < 0) {
                    if (this.x < (paddle.x + (paddle.width / 2))) {
                        this.velocityX = this.velocityX;
                    } else {
                        this.velocityX = -this.velocityX;
                    }
                }
            }
        }

        // bricks
        let brickX : number;
        let brickY : number;
        let brickWidth : number;
        let brickHeight : number;
        for (let i=0; i<brickColumnCount; i++) {
            for (let j=0; j<brickRowCount; j++) {
                if (bricks[i][j].active) {
                    brickX = bricks[i][j].x;
                    brickY = bricks[i][j].y;
                    brickWidth = bricks[i][j].width;
                    brickHeight = bricks[i][j].height;
                    if (this.x > brickX - this.radius 
                        && this.x < brickX + brickWidth + this.radius 
                        && this.y > brickY - this.radius
                        && this.y < brickY + brickHeight + this.radius){
                            bricks[i][j].active = false;
                            addPoint();
                    }
                }      
            }
        }


    }
        
    
}