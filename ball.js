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
    return gamePaused;
  }
  
  checkBrickCollision(brickList) {
    let hit = 0;
    for (let i = 0; i < brickList.length; i++) {
      let b = brickList[i];

      // check if 
      //if(
        // check ball X + Radius against X
        //(this.position.x+this.r >= b.getX() && this.position.x+this.r <= b.getX()+b.w) &&
        //(this.position.y+this.r >= b.getY() && this.position.y+this.r <= b.getY()+b.h)
      
      //) {
      //  hit = true;
      //}
      hit = collideRectCircle(b.position.x, b.position.y, b.w, b.h, this.position.x, this.position.y, this.r+(this.r/2));

      //print('colliding?', hit);
      if(hit) {
        //find out if ball hit the top/bottom or side of brick
        let t1 = createVector(0,0);
        let b1 = createVector(0,0);
        let s1 = createVector(0,0);
        let s2 = createVector(0,0);
        
        t1.x = b.position.x+(b.w/2);
        t1.y = b.position.y;
        
        b1.x = b.position.x+(b.w/2);
        b1.y = b.position.y+b.h;
        
        s1.x = b.position.x;
        s1.y = b.position.y+(b.h/2);
        
        s2.x = b.position.x+b.w;
        s2.y = b.position.y+(b.h/2);
        
        let d = 9999;
        let shortestd = 9999;
        let sideHit = false; // sideHit is true if ball hit side, false if hit top/bottom
        
        
        d = dist(this.position.x, this.position.y, t1.x, t1.y);
        if(d < shortestd) {
          shortestd = d;
          sideHit = false;
        }
        d = dist(this.position.x, this.position.y, b1.x, b1.y);
        if(d < shortestd) {
          shortestd = d;
          sideHit = false;
        }
        d = dist(this.position.x, this.position.y, s1.x, s1.y);
        if(d < shortestd) {
          shortestd = d;
          sideHit = true;
        }
        d = dist(this.position.x, this.position.y, s2.x, s2.y);
        if(d < shortestd) {
          shortestd = d;
          sideHit = true;
        }
        
        //console.log(t1);
        //console.log(b1);
        //console.log(s1);
        //console.log(s2);
        
        
        //if ball hit the top or bottom of the brick, invert y
        if(!sideHit) {
        this.velocity.y *= -1;
        }
        else {
        // if ball hit left or right side of brick, invert x
        this.velocity.x *= -1;
        }
        
        if(b.hits-1 <= 0) {
          brickList.splice(i,1);
        }
        else {
          b.hits--;
        }
        //break;
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
