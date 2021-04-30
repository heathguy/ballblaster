class Ball {
  
  constructor(x, y, r) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    //this.velocity.mult(4);
    this.r = r;
    //this.m = r * 0.1;
  }
  
  checkBoundaryCollision() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.r) {
      this.position.y = height - this.r - 5;
      //this.velocity.y *= -1;
      this.velocity.x = 0;
      this.velocity.y = 0;
      console.log('Hit Bottom');
      gamePaused = true;
      
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }
  
  checkBrickCollision(brickList) {
    for (let i = 0; i < brickList.length; i++) {
      let b = brickList[i];

      let hit = collideRectCircle(b.getX(), b.getY(), b.getW(), b.getH(), this.position.x, this.position.y, this.r);

      //print('colliding?', hit);
      if(hit) {
        this.velocity.y *= -1;
        if(b.hits-1 <= 0) {
          brickList.splice(i,1);
        }
        else {
          b.hits--;
        }
        break;
      } 
    }
}
  
  update() {
    this.position.add(this.velocity);
  }
  
  display() {
    noStroke();
    fill(240,240,240);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
  
}
