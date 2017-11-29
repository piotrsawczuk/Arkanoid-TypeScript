import {canvasWidth, canvasHeight, paddle, decLives, addPoint, brickColumnCount, brickRowCount, bricks, aSounds} from './main';

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
    soundPlayed : boolean = true;

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

    playWinSound(points : number, maxPoints : number) : void {
        if (points >= maxPoints) {
            aSounds[9].cloneNode(true).play();
            this.soundPlayed = true;
        }
    }

    playLoseSound(lives : number) : void {
        if (lives < 0) {
            aSounds[11].cloneNode(true).play();
            this.soundPlayed = true;
        }
    }

    checkCollisions() : void {
        // right side
        if (this.x + this.radius > canvasWidth) {
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
        if (this.y > canvasHeight + 50) {
            decLives();
            this.gameStarted = false;
            this.velocityX = this.velocity;
            this.velocityY = -this.velocity;
            aSounds[10].cloneNode(true).play();
        } else
        // paddle side
        if (this.y > canvasHeight - paddle.height && this.x > paddle.x && this.x < paddle.x + paddle.width) {
            this.velocityX = -this.velocityX;
            aSounds[2].play();
        } else {
            // paddle
            if (this.y > canvasHeight - this.radius - paddle.height
                && this.y < canvasHeight - this.radius
                && this.x > paddle.x 
                && this.x < paddle.x + paddle.width
            ) {
                this.velocityY = -this.velocity;
                aSounds[2].play();
                // going right?
                if (this.velocityX > 0) {
                    if (this.x < (paddle.x + (paddle.width / 2))) {
                        this.velocityX = -this.velocity;
                    } else {
                        this.velocityX = this.velocity;
                    }
                } else
                // going left?
                if (this.velocityX < 0) {
                    if (this.x < (paddle.x + (paddle.width / 2))) {
                        this.velocityX = -this.velocity;
                    } else {
                        this.velocityX = this.velocity;
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


                    var brickOffset : number = 5;
                    var thickness : number = 10;

                    if (this.x + this.radius > brickX && this.x - this.radius < brickX + brickWidth
                    && this.y + this.radius > brickY && this.y - this.radius < brickY + brickHeight) {
                        if(this.y - this.radius < brickY + brickHeight && this.y - this.radius > brickY + brickHeight - thickness
                        && this.x + this.radius > brickX + brickOffset && this.x - this.radius < brickX + brickWidth - brickOffset) {
                            this.velocityY = -this.velocityY;
                            bricks[i][j].active = false;
                            addPoint();
                            aSounds[1].cloneNode(true).play();
                        } else
                        //Hit was from below the brick
                    
                        if(this.y + this.radius > brickY && this.y + this.radius < brickY + thickness
                        && this.x + this.radius > brickX + brickOffset && this.x - this.radius < brickX + brickWidth - brickOffset) {
                            this.velocityY = -this.velocityY;
                            bricks[i][j].active = false;
                            addPoint();
                            aSounds[1].cloneNode(true).play();
                        } else
                        //Hit was from above the brick
                    
                        if(this.x + this.radius > brickX && this.x + this.radius < brickX + thickness
                        && this.y + this.radius > brickY + brickOffset && this.y - this.radius < brickY + brickHeight - brickOffset) {
                            this.velocityX = -this.velocityX;
                            bricks[i][j].active = false;
                            addPoint();
                            aSounds[1].cloneNode(true).play();
                        } else
                        //Hit was on left
                    
                        if(this.x - this.radius < brickX + brickWidth && this.x - this.radius > brickX + brickWidth - thickness
                        && this.y + this.radius > brickY + brickOffset && this.y - this.radius < brickY + brickHeight - brickOffset){
                            this.velocityX = -this.velocityX;
                            bricks[i][j].active = false;
                            addPoint();
                            aSounds[1].cloneNode(true).play();
                        }
                        //Hit was on right
                    }

                    
                }      
            }
        }


    }
        
    
}