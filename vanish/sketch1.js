var RESOLUTION = 15;
vintages = [];
var angles = [];
var rows, cols;
var vanishing = false;
var img;
var clicked = 0;
var bkcol = 0;
var whiter = false;

function preload(){
  
  img = loadImage('vintage.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);
  img.loadPixels();
  for (var x = 0; x < img.width; x += 2) {
    for (var y = 0; y < img.height; y += 2) {
      var index = (x + y * img.width) * 4;
      if (img.pixels[index] != 0) {
        var r = img.pixels[index];
        var g = img.pixels[index + 1];
        var b = img.pixels[index + 2];
        var c = color(r, g, b);
        vintages.push(new Circle(img.width, img.height,x, y, color(c), color(250, 50, 50),0.35*width, 0.45*height));
      }
    }
  }
}

function draw() {
  background(bkcol, 10);
  
   for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {

      var index = r + c * rows; // *** x + y * width

      var x = r * RESOLUTION;
      var y = c * RESOLUTION;
      
      var xfreq = (x + frameCount*0.1) * 0.02;
      var yfreq = (y + frameCount*0.1) * 0.02;
      var amp = 2*PI;
      var val = -noise(xfreq, yfreq) * amp - frameCount*0.001;

      angles[index] = val;
    }
  }
  
  for(i = 0; i<vintages.length;i++){
    var v = vintages[i];
    var r = floor(v.pos.x / RESOLUTION);
    var c = floor(v.pos.y / RESOLUTION);
    var index = r + c * rows;
    
    if(vanishing == true){
    v.flow(angles[index]);
    v.update();
    v.die();
    v.show();
    v.checkEdges();
    }
    if (v.dead) {
      vintages.splice(i, 1);
    }
  }
  
  if(whiter == true && bkcol<220){
     bkcol += 1;
  }

}

function mousePressed(){
  var instruct = document.getElementById('instruction');
  var instruct2 = document.getElementById('instruction2');
  var normal = document.getElementById('normal');
  var vintage = document.getElementById('vintage');
  if(clicked == 0){
    var poem = document.getElementById('poem');
    poem.style.animation = "disappear 2s forwards";
    normal.style.animation = "romantic 4s 2s forwards";
    instruct.style.animation = "romantic 4s 2s forwards";
  }else if(clicked == 1){
    instruct.style.animation = "disappear 2s forwards";
    normal.style.animation = "disappear 2s forwards";
    vintage.style.animation = 'romantic 4s forwards';
    instruct2.style.animation = 'romantic 2s forwards';
  }else if(clicked == 2){
    vanishing = true;
    vintage.style.animation = "none";
    vintage.style.opacity  = "0";
    instruct2.style.animation = 'disappear 1s forwards';
    setTimeout(function(){whiter = true;console.log(1);},2000);
    setTimeout(function(){window.location.href = 'game.html';},10000);
  }
  clicked = clicked + 1;
}