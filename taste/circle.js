"use strict";

class Circle {
  constructor(iwidth, iheight, posx, posy, x, y, color, setcol) {
    this.posori = createVector(x, y);
    this.origin = createVector(posx, posy);
    this.tran = createVector(posx - iwidth / 2, posy - iheight / 2);
    this.pos = p5.Vector.add(this.posori, this.tran);
    this.poscopy = this.pos;
    this.vel = createVector();
    this.acc = createVector();

    this.r = 6;
    this.color = color;
    this.col = setcol;
    this.colorchange = 0;
    this.colorcopy = color;
    this.colstate = 0;
    this.angle = 0;

    this.maxVel = 8;
    this.maxDesiredVel = 4;
    this.maxSteerForce = 0.2;
    this.collided = false;

    this.neighborDistance = 300;
    this.separateDistance = 20;

    this.ran = random(4);

    this.dead = false;

    this.amp = random(0, 0.5);

    this.particle = new Particle(this.color);
    this.attractpoint = createVector(posx, this.pos.y - 1);
    this.changed = false;

    var value = abs(this.posori.y - iheight / 2);
    this.value = map(value, 0, iheight / 2, 1, 3);
  }

  show() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    pop();
  }

  die() {
    var col = color(0);
    this.color = lerpColor(this.color, col, 0.1);
    if (red(this.color) < 15 && green(this.color) < 15 && blue(this.color) < 15) {
      this.dead = true;
    }
  }

  checkColorStraw() {
    if (green(this.colorcopy) > 100 && green(this.colorcopy) > red(this.colorcopy) && red(this.colorcopy) < 80) {
      this.colstate = 0;
    } else {
      this.colstate = 1;
    }
  }

  checkColorCola() {
    if (red(this.colorcopy) > 130) {
      this.colstate = 0;
    } else {
      this.colstate = 1;
    }
  }

  checkColorCotton() {
    if (blue(this.colorcopy) > 100) {
      this.colstate = 0;
    } else {
      this.colstate = 1;
    }
  }

  checkColorSushi() {
    if (red(this.colorcopy) > 200 && green(this.colorcopy) < 150 && blue(this.colorcopy) < 70) {
      this.colstate = 0;
    } else {
      this.colstate = 1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }

  avoid(other) {
    var d = this.pos.dist(other.pos);
    if (d < this.r / 2 + other.r / 2 + 10) {
      var desired = p5.Vector.sub(other.pos, this.pos);
      desired.setMag(this.maxDesiredVel);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxSteerforce);
      this.applyForce(steer);
    }
  }

  displayCotton() {
    push();
    translate(this.pos.x, this.pos.y);
    if(this.particle.dead == false){
      this.particle.display();
    }
    pop();
  }

  updateCotton() {
    if (timecotton > 3) {
      this.attract(this.attractpoint);
      if (this.changed == false) {
        var val = 1;
        var force = createVector(random(-val, val), random(-val * 0.1, 0));
        this.applyForce(force);
        this.changed = true;
      }
    }
    if (timecotton > 8) {
      if ((timecotton - 8) < 0.02) {
        var val = 2;
        var force = createVector(random(-val, val), random(-val * 0.5, 0));
        this.applyForce(force);
      }
      this.cohesion(cottons);
      this.separate(cottons);
    }
    if (timecotton > 14) {
      this.particle.die();
    }
  }

  attract(other) {
    var val = 1 + sin(frameCount * 0.05) * 0.5;
    var d = abs(this.pos.x - other.x) + 1;
    var desired = p5.Vector.sub(other, this.pos);
    desired.setMag(this.maxDesiredVel * 0.2);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.normalize();
    steer.mult(d * val * 0.00005 * this.value);
    //steer.limit(this.maxSteerForce*0.5);
    this.applyForce(steer);
  }

  updateSushi() {
    this.r += 0.2;
    if (this.r > 20) {
      if (this.colstate == 0) {
        fishes.push(new Fish(this.poscopy.x, this.poscopy.y, this.color));
      }
      this.dead = true;
    }
  }

  updateCola() {
    var freq = frameCount * 0.118;
    if (this.r < 10 && timecola < 10) {
      this.r += 0.05;
    }
    if (this.amp < 1.5) {
      this.amp += 0.01;
    }
    if (timecola < 20) {
      if (this.posori.x <= 20 || this.posori.x > 60 && this.posori.x < 90) {
        var col = color(200, 200, 100);
        this.color = lerpColor(this.color, col, 0.02);
      } else if (this.posori.x > 20 && this.posori.x <= 40 || this.posori.x >= 90 && this.posori.x < 110) {
        var col = color(220, 220, 220);
        this.color = lerpColor(this.color, col, 0.02);
      }
    }

    var sinValue = sin(freq + this.ran) * this.amp;
    this.vel = createVector((this.posori.x - imgCola.width / 2) * 0.02 + sinValue, -4);
  }

  updateStraw() {
    if (this.collided == true) {
      if (this.colstate == 1) {
        this.colorchange = 1;
      } else {
        this.colorchange = 2;
      }
    }
    if (timestraw < 19) {
      if (this.colorchange == 1) {
        this.color = lerpColor(this.color, this.col, 0.02);
      } else if (this.colorchange == 2) {
        this.color = color(red(this.colorcopy) + abs(150 * sin(frameCount * 0.05)), green(this.colorcopy) + abs(30 * sin(frameCount * 0.05)), blue(this.colorcopy) + abs(30 * sin(frameCount * 0.05 + 1)));
      }
    }
  }

  applyForce(f) {
    this.acc.add(f);
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

  collisionCola(other) {
    var d = this.pos.dist(other.pos);
    if (d < this.r / 2 + other.r / 2) {
      this.collided = true;
      other.collided = true;
    }
  }

  collision(other) {
    var d = this.pos.dist(other.pos);
    if (d < this.r / 2 + other.r / 2) {
      this.collided = true;
      other.collided = true;
      var desired = p5.Vector.sub(other.pos, this.pos);
      desired.setMag(this.maxDesiredVel);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxSteerforce);
      this.applyForce(steer);
    }
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
      this.applyForce(this.seek(position));
      return;
    }
    this.applyForce(position);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxDesiredVel * 0.2);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce * 0.2);
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
        vector.add(diff);
        count++;
      }
    }
    if (count > 0) {
      vector.div(count);
    }
    if (vector.mag() > 0) {
      vector.setMag(this.maxDesiredVel * 0.5);
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce * 0.5);
    }
    this.applyForce(vector);
  }

  flow(angle) {
    var desiredVel = p5.Vector.fromAngle(angle);
    desiredVel.mult(this.maxDesiredVel);

    var steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);
    steerForce.mult(2);
    this.applyForce(steerForce);
  }

}