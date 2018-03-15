"use strict";

class Leaf {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.acc = createVector(0, 0);
    this.dia = random(5, 10);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, 250, 100);
    ellipse(0, 0, this.dia, this.dia);
    pop();
  }
}