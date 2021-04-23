class Brick {
  constructor(x, y, w, h, hits) {
    this.position = new p5.Vector(x, y);
    this.brickColor = color(255,0,0);
    this.hits = hits;
    this.w = w;
    this.h = h;
  }
  
  getX() {
    return this.position.x;
  }
  getY() {
    return this.position.y;
  }
  getW() {
    return this.w;
  }
  getH() {
    return this.h;
  }
  
  
  display() {
    stroke(255,150,150);
    //strokeWeight(3);
    fill(this.brickColor);
    //rect(this.position.x, this.position.y, this.w, this.h);
    square(this.position.x, this.position.y, this.w);
    noStroke();
    fill(255,255,255);
    if(this.hits < 100) {
      textSize(32);
    }
    else {
      textSize(24);
    }

    textAlign(CENTER, CENTER);
    text(this.hits, this.position.x+2, this.position.y+2, this.w, this.h);
  }
  
}
