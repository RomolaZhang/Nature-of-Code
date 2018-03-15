"use strict";

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.acc = createVector();
    this.r = 6;
    this.maxspeed = 12;
    this.maxforce = 1;
    this.out = false;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  checkBoundary(){
    if(this.pos.x<0||this.pos.x>width||this.pos.y<0||this.pos.y>height){
      this.out = true;
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  display() {
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }


  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  flee(target,n) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < n) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      steer.mult(4);
      this.applyForce(steer);
    }
  }
  
  check(target, n) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < n && mouseIsPressed) {
      pressed = true;
    }
  }
  
}