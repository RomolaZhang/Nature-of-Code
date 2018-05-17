"use strict";

class Particle {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = random(1, 2);
    this.rad = this.mass * 3;
    this.a = 100;
  }

  velocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }


  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }
  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(220, 230, 255);
    sphere(this.rad);
    pop();

  }

  checkFloor() {
    //floor1
    var distance1 = this.pos.dist(up);
    if (distance1 < FLOOR_SIZE / 3) {
      if (this.pos.y - this.rad < -FLOOR_LEVEL) {
        this.pos.y = -FLOOR_LEVEL + this.rad;
        this.vel.y *= -1;
        //restitution
        this.vel.y *= 0.8;
      }
    }
    //floor2
    var distance2 = this.pos.mag();
    if (distance2 < 2 * FLOOR_SIZE / 3) {
      if (this.pos.y - this.rad < 0 && this.pos.y > FLOOR_LEVEL / 2) {
        this.pos.y = this.rad;
        this.vel.y *= -1;
        //restitution
        this.vel.y *= 0.6;
      }
    }
    //floor3
    var distance3 = this.pos.dist(down);
    if (distance3 < FLOOR_SIZE) {
      if (this.pos.y - this.rad < FLOOR_LEVEL) {
        this.pos.y = FLOOR_LEVEL + this.rad;
        this.vel.y *= -1;
        //restitution
        this.vel.y *= 0.4;
      }
    }

  }

  checkFloorWall() {
    var horizon = createVector(this.pos.x, this.pos.z);
    if (horizon.mag() > FLOOR_SIZE - 20) {
      horizon = horizon.normalize();
      this.pos.x = horizon.x * (FLOOR_SIZE - 20);
      this.pos.z = horizon.z * (FLOOR_SIZE - 20);
      this.vel.x *= -1;
      this.vel.z *= -1;
    }

  }

  applyForce(force) {
    force.div(this.mass);
    this.acc.add(force);
  }

  checkCollision(other) {
    var distance = this.pos.dist(other.pos);
    if (distance < this.rad + other.rad) {
      //collided
      //this.particle
      var force = p5.Vector.sub(other.pos, this.pos);
      force.normalize();
      force.mult(this.vel.mag() * 0.7);
      other.applyForce(force);
      //other particle
      force.mult(-1);
      force.normalize();
      force.mult(other.vel.mag() * 0.7);
      this.applyForce(force);
      this.vel.y = 0;
      other.vel.y = 0;
    }
  }

}