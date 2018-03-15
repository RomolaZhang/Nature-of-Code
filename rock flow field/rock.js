var scl = 30;
var xvec, yvec;
var noiseInc = .1;
var time = 0;
var particles = [];
var flowfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(71);
  for (var i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }

}

function draw() { // Rotating Vectors
 
  if(frameCount>200){
    noLoop();
  }
  FlowField();

  for (var k = 0; k < particles.length; k++) {
    particles[k].show();
    particles[k].update();
    particles[k].edge();
    particles[k].follow(flowfield);
  }
}

function FlowField() {
  xvec = floor((windowWidth + 50) / scl);
  yvec = floor((windowHeight + 50) / scl);
  flowfield = new Array(xvec * yvec);

  var yNoise = 0;
  for (var y = 0; y < yvec; y++) {
    var xNoise = 0;
    for (var x = 0; x < xvec; x++) {
      var vecDirect = noise(xNoise, yNoise, time) * 2 * (TWO_PI);
      var dir = p5.Vector.fromAngle(vecDirect);
      var index = x + y * xvec;
      flowfield[index] = dir;
      dir.setMag(3);
      xNoise += noiseInc;
      // stroke(180);
      // push();
      // translate(x * scl, y * scl);
      // rotate(dir.heading());
      // line(0, 0, scl, 0);
      // pop();
    }
    yNoise += noiseInc;
    time += .001;
  }
}

function Particle() {
  this.x = random(width);
  this.y = random(height);
  this.pos = createVector(this.x, this.y);
  this.prevPos = this.pos.copy();
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.r = 2.0;
  this.maxspeed = 5;

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.limit(this.maxspeed);
  }

  this.follow = function(vectors) { // flowfield vectors
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * xvec;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    stroke(160 + 90 * sin(frameCount * 0.05), 80 + 10 * sin(frameCount * 0.05), 71,60);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edge = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}