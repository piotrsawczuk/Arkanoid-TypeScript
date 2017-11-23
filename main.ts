import { Ball } from './ball';
import { Paddle } from './paddle';
import { Brick } from './brick';

let canvas:HTMLCanvasElement = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
// export var canvasWidth = canvas.width = window.innerWidth;
// export var canvasHeight = canvas.height = window.innerHeight;
export var canvasWidth = canvas.width = 800;
export var canvasHeight = canvas.height = 600;

export var leftKeyPressed : boolean = false;
export var rightKeyPressed : boolean = false;
var gamePaused : boolean = false;

// set 2 after tests
const numberOfLives : number = 1;
export var lives : number = numberOfLives;
export function decLives() : void {
    lives--;
}

const startingPoints : number = 0;
var maxPoints : number;
export var points : number = startingPoints;
export function addPoint() : void {
    points++;
}

export let paddle : Paddle = new Paddle();
let ballRadius : number = 10;
let ball : Ball = new Ball(canvas.width / 2, canvas.height - ballRadius - paddle.height, ballRadius);

export var brickColumnCount = 6;
export var brickRowCount = 4;
var brickPadding = 3;
var brickOffsetTop = 100;
// var brickOffset = (canvasWidth - (brickColumnCount - 1) * brickPadding - brickWidth * brickColumnCount) / 2;
// var brickWidth = 100;
var brickOffset = 80;
var brickWidth = (canvasWidth - 2 * brickOffset - (brickColumnCount - 1) * brickPadding) / brickColumnCount;
var brickHeight = 30;

export var bricks : Brick[][] = [];
let tempOffsetLeft = brickOffset;
let tempOffsetTop = brickOffsetTop;
for (let i=0; i<brickColumnCount; i++) {
    bricks[i] = [];
    for (let j=0; j<brickRowCount; j++) {
        bricks[i][j] = new Brick(tempOffsetLeft, tempOffsetTop, brickWidth, brickHeight);
        tempOffsetTop += brickHeight + brickPadding;
    }
    tempOffsetTop = brickOffsetTop;
    tempOffsetLeft += brickWidth + brickPadding;
}

maxPoints = brickColumnCount * brickRowCount;
function main() : void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3599DD';

    if (!gamePaused) {
        ctx.textAlign = "center";
        ctx.font = '20px Roboto';
        ctx.globalAlpha=0.3;
        ctx.fillText("Press P for pause", canvas.width / 2, 30);
        ctx.globalAlpha=1;

        ball.checkIfWin(points, maxPoints);
        ball.updateStartPosition();
        ball.update();
        paddle.update();
    } else {
        ctx.textAlign = "center";
        ctx.font = '70px Roboto';
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    }
    
    ctx.textAlign = "left";
    ctx.font = '20px Roboto';
    ctx.fillText("Points: " + points, 10, 30);

    if (lives < 0) {
        ctx.textAlign = "right";
        ctx.font = '20px Roboto';
        ctx.fillText("Lives: " + 0, canvas.width - 10, 30);
        ctx.textAlign = "center";
        ctx.font = '40px Roboto';
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Roboto';
        ctx.fillText("Press SPACEBAR to start new game", canvas.width / 2, (canvas.height / 2) + 50);
    } else {
        ctx.textAlign = "right";
        ctx.font = '20px Roboto';
        ctx.fillText("Lives: " + lives, canvas.width - 10, 30);
        if (!ball.gameStarted && points >= maxPoints) {
            ctx.textAlign = "center";
            ctx.font = '40px Roboto';
            ctx.fillText("YOU WIN", canvas.width / 2, canvas.height / 2);
            ctx.font = '20px Roboto';
            ctx.fillText("Press SPACEBAR to start new game", canvas.width / 2, (canvas.height / 2) + 50);
        } else
        if (!ball.gameStarted) {
            ctx.textAlign = "center";
            ctx.font = '28px Roboto';
            ctx.fillText("Press SPACEBAR to start", canvas.width / 2, canvas.height / 2);
        }
    }

    for (let i=0; i<brickColumnCount; i++) {
        for (let j=0; j<brickRowCount; j++) {
            if (bricks[i][j].active)
                bricks[i][j].draw(ctx);
        }
    }
    ball.draw(ctx);
    paddle.draw(ctx);
    
    requestAnimationFrame(main);
}
main();

addEventListener("keydown", arrowKeyDownHandler, false);
addEventListener("keyup", arrowKeyUpHandler, false);
addEventListener("keypress", spacePressedHandler, false);
addEventListener("keypress", pauseHandler, false);
// addEventListener("mousemove", mouseMoveHandler, false);

function arrowKeyDownHandler(e) : void {
    if (e.keyCode == 37)
        leftKeyPressed = true;
    else if (e.keyCode == 39)
        rightKeyPressed = true;     
}

function arrowKeyUpHandler(e) : void {
    if (e.keyCode == 37)
        leftKeyPressed = false;
    else if (e.keyCode == 39)   
        rightKeyPressed = false;   
}

function spacePressedHandler(e) : void {
    if (e.keyCode == 32) {
        if (lives < 0 || points >= maxPoints) {
            lives = numberOfLives;
            points = startingPoints;
            for (let i=0; i<brickColumnCount; i++) {
                for (let j=0; j<brickRowCount; j++) {
                    bricks[i][j].active = true;
                }
            }
        }
        ball.gameStarted = true;
    }
}

function pauseHandler(e) : void {
    if (e.keyCode == 112) {
        togglePause();
    }
}

function togglePause() {
    if (!gamePaused) {
        if (ball.gameStarted) {
            gamePaused = true;
        }
    } else
    if (gamePaused) {
        gamePaused = false;
    }
}