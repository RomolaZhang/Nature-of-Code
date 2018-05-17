"use strict";

class Particle {
  constructor(x, y,clr) {
    this.pos = createVector(x, y);
    this.dia = random(10, 30);
    this.angle = random(TWO_PI);
    this.aVel = random(0.005, 0.05);
    this.distance = random(3, 6);
    this.clr = clr;
  }
  display() {
    this.angle += this.aVel;
    this.pos.x = cos(this.angle) * this.distance;
    this.pos.y = sin(this.angle) * this.distance;
    var dia = sin(this.angle) * this.distance;
    noStroke();
    fill(red(this.clr), green(this.clr),blue(this.clr),80);
    ellipse(this.pos.x, this.pos.y, 10 + dia, 10 + dia);
    ellipse(this.pos.x, this.pos.y, 20 + dia, 20 + dia);
    ellipse(this.pos.x, this.pos.y, 30 + dia, 30 + dia);
  }
}

class Blob {
  constructor(x, y,clr) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.clr = clr;
    this.scale = 1.0;
    this.particles = [];
    var randomNumber = floor(random(3, 5));
    for (var i = 0; i < randomNumber; i++) {
      this.particles.push(new Particle(this.pos.x, this.pos.y,this.clr));
    }
    
  }
  
  update(x,y) {
    //physics
    this.scale = x*sin(frameCount*0.04 + this.pos.x) + y;
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.scale);
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].display();
    }
    pop();
  }
}