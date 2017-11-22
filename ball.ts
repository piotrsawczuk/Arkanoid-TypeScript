import {canvasWidth, canvasHeight, paddle, decLives} from './main';

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
            // ściany
            if (this.x > canvasWidth - this.radius || this.x < 0 + this.radius) {
                this.velocityX = -this.velocityX;
            }
            // sufit
            if (this.y < 0 + this.radius) {
                this.velocityY = -this.velocityY;
            }
            // piłka spadła
            if (this.y > canvasHeight + 50) {
                decLives();
                this.gameStarted = false;
                this.velocityX = this.velocity;
                this.velocityY = -this.velocity;
            } else
            // odbicie od ścianki kładki
            if (this.y > canvasHeight - paddle.height && this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.velocityX = -this.velocityX;
            } else {
                // odbicie od kładki
                if (this.y > canvasHeight - this.radius - paddle.height
                    && this.y < canvasHeight - this.radius
                    && this.x > paddle.x 
                    && this.x < paddle.x + paddle.width
                ) {
                    this.velocityY = -this.velocityY;
                    // gdy leci w prawo
                    if (this.velocityX > 0) {
                        if (this.x < (paddle.x + (paddle.width / 2))) {
                            this.velocityX = -this.velocityX;
                        } else {
                            this.velocityX = this.velocityX;
                        }
                    } else
                    // gdy leci w lewo
                    if (this.velocityX < 0) {
                        if (this.x < (paddle.x + (paddle.width / 2))) {
                            this.velocityX = this.velocityX;
                        } else {
                            this.velocityX = -this.velocityX;
                        }
                    }
                }
            }
        }
    }
        // zmienna globalna czy spacja kliknieta, updatuje x i ruszam kladka, po spacji puszczam piłeczke,
        // po przegranej ustawiam flage spacji na false i oczekuje na spacje i odejmuje punkty
        // zakoncz gre, ustaw flage konca gry na true
        
    
}