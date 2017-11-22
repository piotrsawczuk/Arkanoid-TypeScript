import { Ball } from './ball';
import { Paddle } from './paddle';

let canvas:HTMLCanvasElement = document.querySelector('#canvas');
// export var canvasWidth = canvas.width = window.innerWidth;
// export var canvasHeight = canvas.height = window.innerHeight;
export var canvasWidth = canvas.width = 800;
export var canvasHeight = canvas.height = 600;
export var leftKeyPressed : boolean = false;
export var rightKeyPressed : boolean = false;
export var lives : number = 2;
export function decLives() : void {
    lives--;
}

let ctx = canvas.getContext('2d');

export let paddle : Paddle = new Paddle();
let ballRadius : number = 10;
let ball : Ball = new Ball(canvas.width / 2, canvas.height - ballRadius - paddle.height, ballRadius);

function main() : void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ball.updateStartPosition();
    ball.update();
    paddle.update();

    ctx.fillStyle = '#3599DD';
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
        if (!ball.gameStarted) {
            ctx.textAlign = "center";
            ctx.font = '28px Roboto';
            ctx.fillText("Press SPACEBAR to start", canvas.width / 2, canvas.height / 2);
        }
    }

    ball.draw(ctx);
    paddle.draw(ctx);

    requestAnimationFrame(main);
}
main();

addEventListener("keydown", keyDownHandler, false);
addEventListener("keyup", keyUpHandler, false);
addEventListener("keypress", spacePressedHandler, false);

function keyDownHandler(e) : void {
    if (e.keyCode == 37)
        leftKeyPressed = true;
    else if (e.keyCode == 39)
        rightKeyPressed = true;     
}

function keyUpHandler(e) : void {
    if (e.keyCode == 37)
        leftKeyPressed = false;
    else if (e.keyCode == 39)   
        rightKeyPressed = false;   
}

function spacePressedHandler(e) : void {
    if (e.keyCode == 32) {
        if (lives < 0) {
            lives = 2;
        }
        ball.gameStarted = true;
    }
}