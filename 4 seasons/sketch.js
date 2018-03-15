var tree;
var snows = [];
var leaves = [];
var force = [];
var vector2 = [];
var birds = [];
var bcolor = [];
var bstate = false;
var state = 0;
var lstate = false;
var leftWind = [];
var rightWind = [];
var season = 0;
var mouse;
var bunnies = [];

function preload() {
  tree = loadImage("tree.png");
}

function setup() {
  createCanvas(1000, 600);
  background(0);

  //snow
  for (var i = 0; i < 3000; i++) {
    snows.push(new Snow(random(0, 1000), -10, random(-1, 1), random(-8, 2), random(99, 100), random(0.7)));
    leftWind[i] = createVector(random(-0.1, -0.001), 0);
    rightWind[i] = createVector(random(0.001, 0.1), 0);
  }

  //birds
  for (var i = 0; i < 100; i++) {
    var treepos = createVector(500, 320);
    var vector = p5.Vector.fromAngle(random(PI, 2 * PI));
    force[i] = p5.Vector.add(treepos, vector.mult(random(20, 100)));
    bcolor[i] = color(random(150, 250), 0, random(200, 250));
    birds.push(new Bird(force[i].x, force[i].y, random(-20, 20), random(-20, 0), bcolor[i]));
  }
  //leaves for all
  for (var i = 0; i < 500; i++) {
    var treepos = createVector(500, 320);
    var vector = p5.Vector.fromAngle(random(6 / 7 * PI, 15 / 7 * PI));
    vector2[i] = p5.Vector.add(treepos, vector.mult(random(100)));
  }


  //leaves
  for (var i = 0; i < 500; i++) {
    leaves.push(new Leaf(vector2[i].x, vector2[i].y));
  }

}

function draw() {
  mouse = createVector(mouseX, mouseY);
  background(200);
  imageMode(CENTER);
  image(tree, 500, 300, 200, 150);
  rectMode(CORNER);
  noStroke();
  fill(0, 98, 132);
  rect(0, 374, 1000, 326);

  textSize(20);
  fill(200);
  text("Spring", 100, 550);
  text("Summer", 350, 550);
  text("Autumn", 600, 550);
  text("Winter", 850, 550);

  if (season == 0) {
    snow();
  } else if (season == 1) {
    spring();
  } else if (season == 2) {
    summer();
  } else if (season == 3) {
    autumn();
  }
}

function mousePressed() {
  if (mouseX < 150 && mouseX > 50 && mouseY < 560 && mouseY > 540) {
    season = 1;
  }
  if (mouseX < 400 && mouseX > 300 && mouseY < 560 && mouseY > 540) {
    season = 2;
  }
  if (mouseX < 650 && mouseX > 550 && mouseY < 560 && mouseY > 540) {
    season = 3;
  }
  if (mouseX < 900 && mouseX > 800 && mouseY < 560 && mouseY > 540) {
    season = 0;
  }
}

//snow
function snow() {
  for (var i = 0; i < snows.length; i++) {

    var l = snows[i];

    if (state == 1) {
      l.applyForce(rightWind[i]);
    }
    if (state == 2) {
      l.applyForce(leftWind[i]);
    }
    l.run();
  }

}

//spring
function spring() {
  for (var i = 0; i < 500; i++) {
    fill(0, 250, 0, 50);
    ellipse(vector2[i].x, vector2[i].y, 20, 20);
  }

  if (mouseIsPressed) {
    var ypos = random(350, 550);
    bunnies.push(new Bunny(mouseX, ypos));
  }

  for (var i = 0; i < bunnies.length; i++) {
    var gravity = createVector(0, 0.5);
    var bun = bunnies[i];
    bun.applyForce(gravity);
    bun.update();
    bun.display();
    bun.checkBoundaries();
  }

}


//summer
function summer() {
  //greenleaves
  for (var i = 0; i < 500; i++) {
    fill(0, 100, 0, 50);
    ellipse(vector2[i].x, vector2[i].y, 20, 20);
  }

  for (var i = 0; i < birds.length; i++) {
    var b = birds[i];
    var F = p5.Vector.sub(force[i], b.pos);
    b.applyForce(F.mult(0.0001));
    var treepos = createVector(500, 320);
    var judge = p5.Vector.sub(mouse, treepos);
    if (mouseIsPressed && judge.mag() < 80) {
      bstate = true;
      b.pos.y = force[i].y - 1;
      b.vel.x = random(-25, 25);
      b.vel.y = random(-25, 0);
    }
    if (bstate == true && b.pos.y <= force[i].y) {
      b.update();
    }
    b.display();
  }

}

//autumn
function autumn() {

  for (var i = 0; i < leaves.length; i++) {
    var judge = p5.Vector.sub(mouse, treepos);
    var leaf = leaves[i];
    var angle = leaf.vel.heading();
    var change = p5.Vector.fromAngle(radians(-90) + angle);
    leaf.acc = change.mult(0.5);
    var treepos = createVector(500, 320);
    if (mouseIsPressed && judge.mag() < 80) {
      lstate = true;
    }
    if (lstate == true) {
      leaf.update();
      push();
      translate(mouseX - 500, mouseY - 300);
      leaf.display();
      pop();
    }
    if (lstate == false) {
      leaf.display();
    }
  }


}