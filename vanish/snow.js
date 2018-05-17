"use strict";

class Snow {
  constructor(x, y, a, b, c, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(a, b);
    this.acc = createVector(0, 0);
    this.size = random(10, 15);
    this.trans = c;
    this.range = r;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  run() {
    var gravity = createVector(0, 0.01);

    if (this.pos.y < 0.63*height) {
      this.applyForce(gravity);
      this.update();
    } else {
      this.vel.mult(this.range);
      this.pos.add(this.vel);
    }
    this.display();
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, this.trans);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
}