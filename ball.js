class Ball {
  
  constructor(x, y, r) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(3);
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
      this.position.y = height - this.r;
      this.velocity.y *= -1;
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
        b.hits--;
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
