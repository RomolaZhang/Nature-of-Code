"use strict";

class Ball{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(-12,12);
    this.acc = createVector();
    this.r = 20;
    this.maxVel = 15;
    this.mass = 0.2;
  }
  
  display(){
    fill(200, 50, 50);
    noStroke();
    ellipse(this.pos.x,this.pos.y,this.r,this.r);
  }
  
  attract(){
    var mousepos = createVector(mouseX,mouseY);
    var acc = p5.Vector.sub(mousepos, this.pos);
    acc.setMag(1);
    this.acc = acc;
  }
  
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.98);
    this.vel.limit(10);
    this.acc.mult(0);
  }
}