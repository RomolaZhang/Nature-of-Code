"use strict";

class Particle {
  constructor(col) {
    this.pos = createVector();
    this.dia = 2;
    this.diaMax = random(4.5, 5.5);
    this.angle = random(TWO_PI);
    this.aVel = random(0.01, 0.1);
    this.distance = random(3, 6);
    this.color = col;
    
    this.dead = false;
  }
  
  die() {
    var col = color(0);
    this.color = lerpColor(this.color, col, 0.2);
    if (red(this.color) < 10 && green(this.color) < 10 && blue(this.color) < 10) {
      this.dead = true;
    }
  }
  
  display() {
    this.angle += this.aVel;
    if(this.dia<this.diaMax){
      this.dia += 0.1;
    }
    if(timecotton>8){
      this.diaMax += 0.05;
    }
    this.pos.x = cos(this.angle) * this.distance;
    this.pos.y = sin(this.angle) * this.distance;
    var dia = sin(this.angle) * this.distance;

    fill(this.color, 90);
    ellipse(this.pos.x, this.pos.y, this.dia + dia, this.dia + dia);
    ellipse(this.pos.x, this.pos.y, this.dia*2 + dia, this.dia*2 + dia);
    ellipse(this.pos.x, this.pos.y, this.dia*3 + dia, this.dia*3 + dia);
  }
}