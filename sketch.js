let canvasX = 400;
let canvasY = 500;
let canvasBG = 0;

let brickSize = 40;
let ballSize = 10;
let ballSpeed = 5;

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
  
  pauseGame();
  //generateBrickLine(8); //
}

// create a line of bricks from 1-8 bricks add 
function generateBrickLine() {
  let numBricks = random(1,8);
  
  let offsetX = 5;
  let brickX = offsetX;
  for (let x = 0; x < numBricks; x++) {
    let numHits = random(1,999);
    let tempB = new Brick(brickX,brickSize,brickSize,brickSize,numHits);
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
    for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    brick.display();
  }
  if(!gamePaused) {
  
   for (let i = 0; i < balls.length; i++) {
      //let b = balls[i];
     let needToPauseGame = false;
      balls[i].update();
      balls[i].display();
      needToPauseGame = balls[i].checkBoundaryCollision();
     if(needToPauseGame) {
       pauseGame();
     }
      //balls[0].checkCollision(balls[1]);
      balls[i].checkBrickCollision(bricks);
    }  
  }
}

function pauseGame() {
  gamePaused = true;
  console.log('PAUSE GAME!');
  
  // drop existing line of bricks down
  // check for game over condition
  // add new line of bricks to game
  for (let i = 0; i < bricks.length; i++) {
    bricks[i].position.y += brickSize+5;
    bricks[i].display();
    if(bricks[i].position.y+brickSize >= height-brickSize) {
      gameOver = true;
    }
  }
  if(!gameOver) {
    generateBrickLine();
  }
  else {
    endGame();
  }
}

function endGame() {
  noLoop();
  textSize(48);
  textAlign(CENTER, CENTER);
  //text("Game Over", width/2-100, height/2-100, width/2, height/2);
  text("Game Over", width/2, height/2);
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
    
    newVel = mouseVel.sub(newVel); 
    
    console.log(newVel);
    
    newVel.normalize();
      
    balls[0].velocity = newVel;

    balls[0].velocity.mult(ballSpeed);
    
    
    //balls[0].velocity.y *= -1;
    
    gamePaused = false;
  }
}
