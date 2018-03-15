var font;
var vehicles = [];
var strawberries = [];
var colas = [];
var cottons = [];
var sushis = [];
var colasGrey = [];
var fishes = [];
var fish;

var pressed = false;
var stage = 0;
var ball;
var finished = true;
var colaCollided = false;
var sushiCollided = false;
var cottonCollided = false;

var RESOLUTION = 20;
var rows, cols;
var anglesCenter = [];
var angles = [];
var angles2 = [];
var angles3 = [];
var angles4 = [];

var adjust;

var playStraw = false;
var playCola = false;
var playCotton = false;
var playSushi = false;

var strawsong;
var colasong;
var cottonsong;
var sushisong;

var timestraw;
var timecola;
var timecotton;
var timesushi;

var drawStraw = false;
var drawCola = false;
var drawCotton = false;
var drawSushi = false;

var imgStraw;
var imgCotton;
var imgSushi;
var imgCola;

var param = {
  strawberry: false,
  cottonCandy: false,
  sushi: false,
  cola: false
};

var gui = new dat.gui.GUI();
gui.add(param, "cottonCandy");
gui.add(param, "strawberry");
gui.add(param, "sushi");
gui.add(param, 'cola');

function preload() {
  font = loadFont('PoiretOne-Regular.ttf');
  imgStraw = loadImage("assets/straw.png");
  fish = loadImage("assets/fish.png");
  imgCola = loadImage("assets/cola2.png");
  imgCotton = loadImage("assets/cottonCandy.png");
  imgSushi = loadImage("assets/sushis2.png");
  strawsong = loadSound('assets/straw.mp3');
  colasong = loadSound('assets/cola.mp3');
  sushisong = loadSound('assets/sushi.wav');
  cottonsong = loadSound('assets/cotton.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);

  ball = new Ball(width / 2, 0);

  //text
  var points = font.textToPoints('taste', 9 * width / 28, 4 * height / 7, height / 3, {
    sampleFactor: 0.1
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

  var density = displayDensity();
  pixelDensity(1);

  //strawberry
  imgStraw.loadPixels();
  imgCola.loadPixels();
  imgCotton.loadPixels();
  imgSushi.loadPixels();

}

function createStraw(strawx, strawy) {
  for (var x = 0; x < imgStraw.width; x += 12) {
    for (var y = 0; y < imgStraw.height; y += 12) {
      var index = (x + y * imgStraw.width) * 4;
      if (imgStraw.pixels[index] != 0) {
        var r = imgStraw.pixels[index];
        var g = imgStraw.pixels[index + 1];
        var b = imgStraw.pixels[index + 2];
        var c = color(r, g, b);
        strawberries.push(new Circle(imgStraw.width, imgStraw.height, strawx, strawy, x, y, color(c), color(250, 50, 50)));
      }
    }
  }

  for (var i = 0; i < strawberries.length; i++) {
    strawberries[i].checkColorStraw();
  }
}

function createCola(colax, colay) {
  for (var x = 0; x < imgCola.width; x += 10) {
    for (var y = 0; y < imgCola.height; y += 10) {
      var index = (x + y * imgCola.width) * 4;
      if (imgCola.pixels[index] != 0) {
        var r = imgCola.pixels[index];
        var g = imgCola.pixels[index + 1];
        var b = imgCola.pixels[index + 2];
        var c = color(r, g, b);
        colas.push(new Circle(imgCola.width, imgCola.height, colax, colay, x, y, color(c), color(250, 50, 50)));
      }
    }
  }
  for (var i = 0; i < colas.length; i++) {
    colas[i].checkColorCola();
    if (colas[i].colstate == 1 && colas[i].posori.y > 90) {
      colasGrey.push(colas[i]);
    }
  }
}

function createCotton(cottonx, cottony) {
  for (var x = 0; x < imgCotton.width; x += 10) {
    for (var y = 0; y < imgCotton.height; y += 10) {
      var index = (x + y * imgCotton.width) * 4;
      if (imgCotton.pixels[index] != 0) {
        var r = imgCotton.pixels[index];
        var g = imgCotton.pixels[index + 1];
        var b = imgCotton.pixels[index + 2];
        var c = color(r, g, b);
        cottons.push(new Circle(imgCotton.width, imgCotton.height, cottonx, cottony, x, y, color(c), color(250, 50, 50)));
      }
    }
  }
  for (var i = 0; i < cottons.length; i++) {
    cottons[i].checkColorCotton();
  }
}

function createSushi(sushix, sushiy) {
  for (var x = 0; x < imgSushi.width; x += 13) {
    for (var y = 0; y < imgSushi.height; y += 13) {
      var index = (x + y * imgSushi.width) * 4;
      if (imgSushi.pixels[index] != 0) {
        var r = imgSushi.pixels[index];
        var g = imgSushi.pixels[index + 1];
        var b = imgSushi.pixels[index + 2];
        var c = color(r, g, b);
        sushis.push(new Circle(imgSushi.width, imgSushi.height, sushix, sushiy, x, y, color(c), color(250, 50, 50)));
      }
    }
  }
  for (var i = 0; i < sushis.length; i++) {
    sushis[i].checkColorSushi();
  }
}

function draw() {
  ball.display();
  ball.update();
  ball.attract();
  if (stage == 0) {
    startScreen();
  } else if (stage == 1) {
    gameScreen();
  }
}

function gameScreen() {
  background(0, 20);
  finished = true;

  if (param.strawberry) {
    var xpos = random(width / 5, 4 * width / 5);
    var ypos = random(height / 4, 3 * height / 4);

    createStraw(xpos, ypos);

    param.strawberry = false;
    drawStraw = true;
  }

  if (param.cola) {
    var xpos = random(width / 5, 4 * width / 5);
    var ypos = random(4 * height / 7, 5 * height / 7);

    createCola(xpos, ypos);

    param.cola = false;
    drawCola = true;
  }

  if (param.cottonCandy) {
    var xpos = random(width / 5, 4 * width / 5);
    var ypos = random(height / 5, 4 * height / 5);

    createCotton(xpos, ypos);

    param.cottonCandy = false;
    drawCotton = true;
  }

  if (param.sushi) {
    var xpos = random(width / 5, 4 * width / 5);
    var ypos = random(height / 5, 4 * height / 5);

    createSushi(xpos, ypos);

    param.sushi = false;
    drawSushi = true;
  }

  if (strawberries.length == 0) {
    drawStraw = false;
    playStraw = false;
  }

  if (sushis.length == 0 && fishes.length == 0) {
    playSushi = false;
    drawSushi = false;
    sushiCollided = false;
  }

  if (colas.length == 0) {
    colasGrey.splice(0, colasGrey.length);
    drawCola = false;
    playCola = false;
    colaCollided = false;
  }

  if (cottons.length == 0) {
    drawCotton = false;
    playCotton = false;
    cottonCollided = false;
  }

  if (drawStraw) {
    drawStrawberry();
  }

  if (drawCola) {
    drawColacola();
  }

  if (drawCotton) {
    drawCottonCandy();
  }

  if (drawSushi) {
    drawSushis();
  }

}

function drawSushis() {
  for (var i = 0; i < fishes.length; i++) {
    f = fishes[i];
    f.update();
    f.display();
    f.flock(fishes);
    f.attract(ball);
    if (timesushi < 5.5) {
      f.checkEdges();
    }
    if (timesushi > 15) {
      fishes.splice(0, fishes.length);
    }
    f.die();
    if (f.dead) {
      fishes.splice(i, 1);
    }
  }

  if (playSushi == true && sushisong.isPlaying() == false) {
    sushisong.play();
  }

  timesushi = sushisong.currentTime();

  if (timesushi > 15.9) {
    sushisong.stop();
  }

  for (var i = 0; i < sushis.length; i++) {
    var s = sushis[i];
    s.show();
    if (sushiCollided == false) {
      s.collisionCola(ball);
    }
    if (s.collided) {
      playSushi = true;
      sushiCollided = true;
    }
    if (sushiCollided) {
      s.updateSushi();
    }
    if (s.dead) {
      sushis.splice(i, 1);
    }
  }
}

function drawCottonCandy() {
  if (strawsong.isPlaying() && abs(timestraw % 6) < 0.1 || sushisong.isPlaying() && abs(timesushi % 6) < 0.1 || strawsong.isPlaying() == false && sushisong.isPlaying() == false) {
    if (playCotton == true && cottonsong.isPlaying() == false) {
      cottonsong.play();
    }
  }

  if (timecotton > 15.9) {
    cottonsong.stop();
  }

  timecotton = cottonsong.currentTime();

  for (var i = 0; i < cottons.length; i++) {
    var c = cottons[i];
    c.update();
    if (cottonCollided == false) {
      c.show();
    }
    c.checkEdges();
    if (cottonCollided == false) {
      c.collisionCola(ball);
    }
    if (timecotton > 13) {
      c.die();
    }
    if (c.collided) {
      playCotton = true;
      cottonCollided = true;
    }
    if (cottonCollided) {
      if (c.colstate == 0) {
        c.displayCotton();
        c.updateCotton();
      } else {
        c.show();
      }
    }
    if (c.dead) {
      cottons.splice(i, 1);
    }

  }
}


function drawColacola() {
  if (strawsong.isPlaying() && abs(timestraw % 6) < 0.1 || cottonsong.isPlaying() && abs(timecotton % 6) < 0.1 || strawsong.isPlaying() == false && cottonsong.isPlaying() == false) {
    if (playCola == true && colasong.isPlaying() == false) {
      colasong.play();
    }
  }

  if (timecola > 22.5) {
    colasong.stop();
  }

  timecola = colasong.currentTime();

  for (var i = 0; i < colas.length; i++) {
    var c = colas[i];
    c.show();
    c.update();
    c.checkEdges();
    if (colaCollided == false) {
      c.collisionCola(ball);
    }
    if (c.collided) {
      playCola = true;
      colaCollided = true;
    }
    if (timecola > 20) {
      c.die();
    }
    if (colaCollided) {
      if (c.colstate == 0) {
        c.updateCola();
        for (var a = 0; a < colasGrey.length; a++) {
          c.avoid(colasGrey[a]);
        }
      }
    }
    if (c.dead) {
      colas.splice(i, 1);
    }
  }

}

function drawStrawberry() {

  flowField(strawberries[0].origin.x, strawberries[0].origin.y);

  if (colasong.isPlaying() && abs(timecola % 6) < 1 || colasong.isPlaying() == false) {
    if (playStraw == true && strawsong.isPlaying() == false) {
      strawsong.play();
    }
  }

  timestraw = strawsong.currentTime();

  if (timestraw > 20.5) {
    strawsong.stop();
  }

  if (timestraw < 10) {
    adjust = width / 5;
  } else {
    adjust -= 2;
  }


  for (var i = 0; i < strawberries.length; i++) {
    var s = strawberries[i];
    s.show();
    s.update();
    s.updateStraw();
    s.checkEdges();
    if (timestraw > 17) {
      s.die();
    }
    if (s.collided == false) {
      finished = false;
    } else {
      playStraw = true;
      var r = floor(s.pos.x / RESOLUTION);
      var c = floor(s.pos.y / RESOLUTION);
      var index = r + c * rows;
      if (s.colstate == 0) {
        if (s.ran < 1) {
          s.flow(angles[index]);
        } else if (s.ran < 2) {
          s.flow(angles2[index]);
        } else if (s.ran < 3) {
          s.flow(angles3[index]);
        } else {
          s.flow(angles4[index]);
        }
      } else {
        s.flow(anglesCenter[index]);
      }
    }
    if (s.dead) {
      strawberries.splice(i, 1);
    }
  }

  if (finished == false) {
    for (var i = 0; i < strawberries.length; i++) {
      var s = strawberries[i]
      s.collision(ball);
      for (var a = 0; a < strawberries.length; a++) {
        if (a != i) {
          s.collision(strawberries[a]);
        }
      }
    }
  }
}

function flowField(a, b) {
  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
      var x = r * RESOLUTION;
      var y = c * RESOLUTION;

      var angleAdj2 = sin(frameCount * 0.1) * PI / (2 + sin(frameCount * 0.03));
      var angleAdj = 2 * sin(frameCount * 0.1) * PI / (6 + 2 * sin(frameCount * 0.2));

      var pos = createVector(x + RESOLUTION / 2, y + RESOLUTION / 2);

      //center
      var centerPos = createVector(a, b);
      var vectorCenter = p5.Vector.sub(centerPos, pos);
      var angleFromCenter = vectorCenter.heading() + angleAdj2;
      var index = r + c * rows;
      anglesCenter[index] = angleFromCenter;

      //mouse
      var mousePos = createVector(a + adjust, b + adjust);
      var mousePos2 = createVector(a - adjust, b - adjust);
      var mousePos3 = createVector(a + adjust, b - adjust);
      var mousePos4 = createVector(a - adjust, b + adjust);

      var vector = p5.Vector.sub(mousePos, pos);
      var vector2 = p5.Vector.sub(mousePos2, pos);
      var vector3 = p5.Vector.sub(mousePos3, pos);
      var vector4 = p5.Vector.sub(mousePos4, pos);

      var angle = vector.heading() + angleAdj;
      var angle2 = vector2.heading() + angleAdj;
      var angle3 = vector3.heading() + angleAdj;
      var angle4 = vector4.heading() + angleAdj;

      angles[index] = angle;
      angles2[index] = angle2;
      angles3[index] = angle3;
      angles4[index] = angle4;
    }
  }
}


function startScreen() {
  background(0, 50);

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    if (pressed == false) {
      v.arrive(v.target);
      v.flee(ball.pos, 60);
    } else {
      v.maxSpeed = 16;
      v.flee(ball.pos, width / 3);
      v.lifeDecrease = true;
    }
    v.check(ball.pos, 60);
    v.checkBoundary();
    v.update();
    v.display();

    if (v.out == true) {
      vehicles.splice(i, 1);
    }
  }

  if (vehicles.length == 0) {
    stage = 1;
  }
}