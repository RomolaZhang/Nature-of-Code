"use strict";


var FLOOR_LEVEL = -120;
var FLOOR_SIZE = 300;
var particles = [];
var up;
var down;
var MAX = 1000;


function setup() {
  createCanvas(1000, 600, WEBGL);
  up = createVector(0, -FLOOR_LEVEL, 0);
  down = createVector(0, FLOOR_LEVEL, 0);

}

function draw() {
  
  if (particles.length > MAX) {
    particles.splice(0,1);
  }

  scale(1, -1, 1); //to flip y axis
  background(170);

  push();
  translate(0, 0, -FLOOR_SIZE / 2);
  particles.push(new Particle(0, FLOOR_SIZE / 3, 0)
    .velocity(random(-2.5, -2), 23, random(-0.5, 0.5)));

  particles.push(new Particle(0, FLOOR_SIZE / 3, 0)
    .velocity(random(2, 2.5), 23, random(-0.5, 0.5)));
  pop();

  var dirY = (mouseY / height - 0.5) * 2;
  var dirX = (mouseX / width - 0.5) * 2;
  directionalLight(200, 220, 255, dirX, dirY, 0.25);

  //rotate
  var rotY = map(mouseX, 0, width, -PI / 2, PI / 2)
  rotateY(rotY);
  var rotX = map(mouseY, 0, height, -PI / 6, PI / 6)
  rotateX(rotX);

  //column
  push();
  translate(0, 0, -FLOOR_SIZE / 2);
  cylinder(15, 2 * FLOOR_LEVEL);
  pop();

  //floor1
  push();
  translate(0, FLOOR_LEVEL, -FLOOR_SIZE / 2);
  ambientLight(200, 200, 255);
  cylinder(FLOOR_SIZE, 10);
  pop();
  //floor2
  push();
  translate(0, 0, -FLOOR_SIZE / 2);
  cylinder(2 * FLOOR_SIZE / 3, 10);
  pop();
  //floor3
  push();
  translate(0, -FLOOR_LEVEL, -FLOOR_SIZE / 2);
  cylinder(FLOOR_SIZE / 3, 10);
  pop();
  //enclosure
  push();
  translate(0, FLOOR_LEVEL + 10, -FLOOR_SIZE / 2);
  rotateX(PI / 2);
  torus(FLOOR_SIZE - 10, 15);
  pop();


  for (var a = 0; a < particles.length; a++) {
    push();
    translate(0, 0, -FLOOR_SIZE / 2);
    var p = particles[a];
    var gravity = createVector(0, -1, 0);
    gravity.mult(p.mass);
    p.display();
    p.update();
    p.checkFloor();
    p.checkFloorWall();
    p.applyForce(gravity);

    if (p.pos.y == FLOOR_LEVEL + p.rad) {
      p.vel.mult(0.97);
      for (var b = 0; b < particles.length; b++) {
        if (a != b) {
          p.checkCollision(particles[b]);
        }
      }
    }
    pop();
  }

}