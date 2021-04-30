let canvasX = 400;
let canvasY = 500;
let canvasBG = 0;

let brickSize = 40;
let ballSize = 10;
let ballSpeed = 4;

let balls = [new Ball(canvasX/2, canvasY-ballSize-5, ballSize)];
let bricks = [];

let gamePaused = true;
let gameOver = false;

let drawLaunchLine = false;

console.log(balls);

//testing
//console.log(p5.Vector.random2D());

function setup() {
  canvasBG = color(25, 25, 255);
  createCanvas(canvasX,canvasY);
  
  generateBrickLine(8); //
}
    
function generateBrickLine(numBricks) {
  let offsetX = 5;
  let brickX = offsetX;
  for (let x = 0; x < numBricks; x++) {

    let tempB = new Brick(brickX,brickSize,brickSize,brickSize,2);
    bricks.push(tempB);
    offsetX += (brickSize+10);
    brickX = offsetX;
  }  
  console.log(bricks);
}

function draw() {
  background(canvasBG);
  balls[0].display();
  if(drawLaunchLine) {
    stroke(255,255,255);
    line(balls[0].position.x, balls[0].position.y, mouseX, mouseY);
  }
  
  if(!gamePaused) {
  
   for (let i = 0; i < balls.length; i++) {
      //let b = balls[i];
      balls[i].update();
      balls[i].display();
      balls[i].checkBoundaryCollision();
      //balls[0].checkCollision(balls[1]);
      balls[i].checkBrickCollision(bricks);
    }
  }
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    brick.display();
  }

}

function keyPressed() {
  if (keyCode === 32) {
    gamePaused = false;
  }
}

function mousePressed() {
  if(gamePaused) {
    drawLaunchLine = true;
  }
}
function mouseReleased() {
  if(gamePaused) {
    drawLaunchLine = false;
    
    let mouseVel = new p5.Vector(mouseX,mouseY);
    
    let newVel = new p5.Vector(balls[0].position.x,balls[0].position.y);
    
    //if(mouseVel.x < balls[0].position.x) {
      newVel = mouseVel.sub(newVel); 
    //}
    //else {
      //newVel = mouseVel.sub(newVel);
      //newVel.x *= -1;
      //newVel.y *= -1;
    //}
    
    console.log(newVel);
    
    newVel.normalize();
      
    balls[0].velocity = newVel;

    balls[0].velocity.mult(ballSpeed);
    
    
    //balls[0].velocity.y *= -1;
    
    gamePaused = false;
  }
}
