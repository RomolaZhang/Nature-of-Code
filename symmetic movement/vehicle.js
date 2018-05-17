"use strict";

class Center {
  constructor(i) {
    this.ori = createVector(RESOLUTION * 4 * sin(i * PI / 12), RESOLUTION * 4 * cos(i * PI / 12));
    this.mid = createVector(width / 2, height / 2);
    this.pos = p5.Vector.add(this.ori, this.mid);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = 0;

    this.maxDesiredVel = 5;
    this.maxSteerForce = 0.2;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }

  applyForce(f) {
    this.acc.add(f);
  }

  flow(angle) {
    var desiredVel = p5.Vector.fromAngle(angle);
    //desiredVel.normalize();
    desiredVel.mult(this.maxDesiredVel);

    var steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }

  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(100+sin(frameCount*0.05)*50, 200-sin(frameCount*0.05)*50, 200+sin(frameCount*0.05)*50);
    ellipse(0, 0, 5, 5);
    pop();
  }

}

class CenterL extends Center {
  constructor(i) {
    super(i);
    this.ori = createVector(RESOLUTION * 8 * sin(i * PI / 6), RESOLUTION * 8 * cos(i * PI / 6));
    this.mid = createVector(width / 2, height / 2);
    this.pos = p5.Vector.add(this.ori, this.mid);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(150+sin(frameCount*0.05)*50, 100+sin(frameCount*0.05)*50, 150+sin(frameCount*0.05)*50);
    triangle(-3, 3, -3, -3, 3, 0);
    pop();
  }
}