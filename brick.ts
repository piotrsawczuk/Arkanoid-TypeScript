export class Brick {
    x : number;
    y : number;
    width : number;
    height : number;
    active : boolean = true;

    constructor(x : number, y : number, width : number, height : number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx : any) : void {
        ctx.beginPath();
        ctx.fillStyle = '#3599DD';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }

    onCollision() : void {
        this.active = false;
    }    
}