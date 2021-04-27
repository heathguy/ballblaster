let canvasX = 400;
let canvasY = 500;
let canvasBG = 0;

let brickSize = 40;

let balls = [new Ball(canvasX/2, canvasY-10, 10)];
let bricks = [];

console.log(balls);

function setup() {
  canvasBG = color(25, 25, 255);
  createCanvas(canvasX,canvasY);
  
  generateBrickLine(8); //
}
    
function generateBrickLine(numBricks) {
  let offsetX = 5;
  let brickX = offsetX;
  for (let x = 0; x < numBricks; x++) {

    let tempB = new Brick(brickX,brickSize,brickSize,brickSize,1);
    bricks.push(tempB);
    offsetX += (brickSize+10);
    brickX = offsetX;
  }  
  console.log(bricks);
}

function draw() {
  background(canvasBG);
  
   for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
    //balls[0].checkCollision(balls[1]);
    b.checkBrickCollision(bricks);
  }
  
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    brick.display();
  }
  console.log(bricks);
}
