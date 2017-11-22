import { Ball } from './ball';
import { Paddle } from './paddle';

let canvas:HTMLCanvasElement = document.querySelector('#canvas');
// canvas.width = window.innerWidth;
// canvas.height =  window.innerHeight;
export var canvasWidth = canvas.width = 800;
export var canvasHeight = canvas.height = 600;
export var leftKeyPressed : boolean = false;
export var rightKeyPressed : boolean = false;
export var spaceKeyPressed : boolean = false;

let ctx = canvas.getContext('2d');

export let paddle : Paddle = new Paddle();
let ballRadius : number = 10;
let ball : Ball = new Ball(canvas.width / 2, canvas.height - ballRadius - paddle.height, ballRadius);

function main() : void {
    ball.update();
    paddle.update();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        spaceKeyPressed = true;
    }
}