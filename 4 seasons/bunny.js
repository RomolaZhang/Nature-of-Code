"use strict";

class Bunny {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-8, -15));
    this.acc = createVector(0, 0);
    this.dia = random(10, 30);
    this.ymax = y;
    this.col = color(255, random(180, 200), random(180, 200));
  }
  applyForce(f) {
    this.acc.add(f);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.col);
    ellipse(0, 0, this.dia, this.dia);
    pop();
  }
  checkBoundaries() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > this.ymax) {
      this.pos.y = this.ymax;
      this.vel.y = -this.vel.y;
    }
  }
}