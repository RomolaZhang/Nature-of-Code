"use strict";

class Fish {
  constructor(x, y,col) {
    this.pos = createVector(x, y);
    this.poscopy = this.pos;
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 5; // max speed;
    this.maxSteerForce = 0.1; // max steering force
    this.col = col;

    this.separateDistance = 20;
    this.neighborDistance = 50;
    
    this.dead = false;
  }

  
  attract(target) {
    var desired = p5.Vector.sub(target.pos, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce*0.8);
    this.applyForce(steer);
  }
  
  
  
  avoid(other){
      var distance = this.pos.dist(other.pos);
      if(distance<60){
        var desired = p5.Vector.sub(this.pos,other.pos);
        desired.setMag(this.maxSpeed*3);
        var steerForce = p5.Vector.sub(desired, this.vel);
        steerForce.limit(this.maxSteerForce*4);
        this.applyForce(steerForce);
      }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  
  die(){
    if(this.pos.x<0||this.pos.x>width||this.pos.y<0||this.pos.y>height){
      this.dead = true;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  flock(boids) {
    var sepaForce = this.separate(boids);
    var coheForce = this.cohesion(boids)
    var alignForce = this.align(boids)
    sepaForce.mult(1.5);
    coheForce.mult(0.5);

    this.applyForce(sepaForce);
    this.applyForce(coheForce);
    this.applyForce(alignForce);
  }
  
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);
    return steer;
  }
  
  separate(others) {
    var vector = createVector(); // sum for now
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.separateDistance) {
        var diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(distance);
        // let's get the sum!
        vector.add(diff);
        count++;
      }
    }
    // let's get the average
    if (count > 0) {
      vector.div(count);
    }
    if (vector.mag() > 0) {
      // desired velocity
      vector.setMag(this.maxSpeed);
      // steering force
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce);
    }
    return vector;
  }
  cohesion(others) {
    var position = createVector();
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if ((distance > 0) && (distance < this.neighborDistance)) {
        position.add(other.pos);
        count++;
      }
    }
    if (count > 0) {
      position.div(count);
      return this.seek(position);
    }
    return position;
  }
  align(others) {
    var velocity = createVector();
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if ((distance > 0) && (distance < this.neighborDistance)) {
        velocity.add(other.vel);
        count++;
      }
    }
    if (count > 0) {
      velocity.div(count);
      velocity.setMag(this.maxSpeed);
      var steer = p5.Vector.sub(velocity, this.vel);
      steer.limit(this.maxSteerForce);
      return steer;
    }
    return velocity;
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
    if (timesushi < 6) {
      translate(this.poscopy.x, this.poscopy.y);
    } else {
      translate(this.pos.x, this.pos.y);
    }
    rotate(this.angle);
    tint(this.col,90);
    image(fish, 0, 0);
    pop();
  }


}