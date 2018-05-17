"use strict";

class Circle {
  constructor(iwidth, iheight, x, y, color, setcol,orix,oriy) {
    this.posori = createVector(x, y);
    this.origin = createVector(orix,oriy);
    this.pos = p5.Vector.add(this.posori, this.origin);
    this.poscopy = this.pos;
    this.vel = createVector((this.pos.x-width/2)*0.5 ,(-this.pos.y+height/2) );
    this.acc = createVector();

    this.color = color;
    this.col = setcol;
    this.colorchange = 0;
    this.colorcopy = color;
    this.angle = 0;

    this.maxVel = 8;
    this.maxDesiredVel = 4;
    this.maxSteerForce = 0.1;

    this.dead = false;

    this.changed = false;
  }

  show() {
    push();
    stroke(this.color);
    point(this.pos.x, this.pos.y);
    pop();
  }
  
  applyForce(f) {
    this.acc.add(f);
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  
  checkEdges() {
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 ||this.pos.y > height) {
      this.dead = true;
    }
  }
  

  die() {
    var col = color(0);
    this.color = lerpColor(this.color, col, 0.02);
    if (red(this.color) < 30 && green(this.color) < 30 && blue(this.color) < 30) {
      this.dead = true;
    }
  }
  
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxDesiredVel * 0.2);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce * 0.2);
    return steer;
  }

  flow(angle) {
    var desiredVel = p5.Vector.fromAngle(angle);
    desiredVel.mult(this.maxDesiredVel);
    var steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);
    steerForce.mult(1.5);
    this.applyForce(steerForce);
  }

}