let balls = [new Ball(100, 400, 20), new Ball(700, 400, 80)];
console.log(balls);

function setup() {
  
  createCanvas(710, 400);
  
  
}

function draw() {
  background(220);
  
   for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
    balls[0].checkCollision(balls[1]);
  }
  
}
