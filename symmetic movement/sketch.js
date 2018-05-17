var RESOLUTION = 20;
var rows, cols;
var angles = [];
var angles2 = [];
var angles3 = [];
var angles4 = [];
var anglesCenter = [];

var centers = [];

function setup() {
  createCanvas(800, 600);
  //background(0);
  rows = floor(width / RESOLUTION);
  cols = floor(height / RESOLUTION);

  for (var i = 0; i < 24; i++) {
    centers.push(new Center(i));
  }
  for (var i = 0; i < 12; i++) {
    centers.push(new CenterL(i));
  }
}

function draw() {
  background(0,10);
  noStroke();
  fill(140, 140, 140);
  ellipse(mouseX, mouseY, 3, 3);
  ellipse(width - mouseX, height - mouseY, 3, 3);
  ellipse(mouseX, height - mouseY, 3, 3);
  ellipse(width - mouseX, mouseY, 3, 3);

  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
      var x = r * RESOLUTION;
      var y = c * RESOLUTION;
      
      var angleAdj2 = sin(frameCount * 0.05) * PI / 2//+sin(frameCount*0.03));
      var angleAdj = sin(frameCount * 0.05) * PI / (5+3*sin(frameCount*0.03));

      var pos = createVector(x + RESOLUTION / 2, y + RESOLUTION / 2);

      //center
      var centerPos = createVector(width / 2, height / 2);
      var vectorCenter = p5.Vector.sub(centerPos, pos);
      var angleFromCenter = vectorCenter.heading() + angleAdj2;

      //Mouse
      var mousePos = createVector(mouseX, mouseY);
      var mousePos2 = createVector(width - mouseX, height - mouseY);
      var mousePos3 = createVector(mouseX, height - mouseY);
      var mousePos4 = createVector(width - mouseX, mouseY);

      var vector = p5.Vector.sub(mousePos, pos);
      var vector2 = p5.Vector.sub(mousePos2, pos);
      var vector3 = p5.Vector.sub(mousePos3, pos);
      var vector4 = p5.Vector.sub(mousePos4, pos);

      var angleFromMouse = vector.heading() + angleAdj;
      var angleFromMouse2 = vector2.heading() + angleAdj;
      var angleFromMouse3 = vector3.heading() + angleAdj;
      var angleFromMouse4 = vector4.heading() + angleAdj;


      var index = r + c * rows;

      var angle = angleFromMouse;
      var angle2 = angleFromMouse2;
      var angle3 = angleFromMouse3;
      var angle4 = angleFromMouse4;

      angles[index] = angle;
      angles2[index] = angle2;
      angles3[index] = angle3;
      angles4[index] = angle4;
      anglesCenter[index] = angleFromCenter;

    }
  }

  for (var i = 0; i < centers.length ; i++) {
    var v = centers[i];
    var r = floor(v.pos.x / RESOLUTION);
    var c = floor(v.pos.y / RESOLUTION);
    var index = r + c * rows;
    if (i < 6) {
      v.flow(angles[index]);
    } else if (i < 12) {
      v.flow(angles2[index]);
    } else if (i < 18) {
      v.flow(angles3[index]);
    } else if (i < 24) {
      v.flow(angles4[index]);
    } else{
      v.flow(anglesCenter[index]);
    }
    v.checkEdges();
    v.update();
    v.display();
  }

}