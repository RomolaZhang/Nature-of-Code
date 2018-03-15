"use strict";

class Bird{
  constructor(x,y,a,b,c){
    this.pos = createVector(x,y);
    this.vel = createVector(a, b);
    this.acc = createVector(0, 0);
    this.size = random(5,10);
    this.col = c;
  }
  applyForce(f){
    this.acc.add(f);
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  update2(){
    this.vel.mult(0.9);
  }
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    fill(this.col,50);
    ellipse(0,0,this.size,this.size);
    pop();
  }
}