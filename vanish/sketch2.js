"use strict";

var bird1;
var bird2;
var flowers = [];
var flower1;
var img;
var RESOLUTION = 3;
var snows = [];
var blobs = [];
var terrainx = [];
var terrainy = [];
var terrainy2 = [];
var terrainy3 = [];
var points = [];
var rows, cols;
var angles = [];
var lens = [];
var widths = [100,200,350,440,720,820,910,1050,1170];
var heights = [565,540,515,575,515,550,580,515,555];
var lens = [70,58,45,75,50,70,78,52,68];
var diffs = [1,2,4,0,3,5,8,6,7];
var clrs = [120,155,170,110,150,135,110,160, 125];
var def;
var bkc;
var sunc;
var moonc;
var starc;
var count;
var blc;
var tran = 0;
var bgm;

function preload(){
  flower1 = loadImage('flower1.png');
  bird1 = loadImage('bird.png');
  bird2 = loadImage('bird2.png');
  img = loadImage("character.png");
  bgm = loadSound('bgm.mp3');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(230);
  bgm.play();
  img.loadPixels();
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);
  
  bkc = color(230);
  sunc = color(220,210,180);
  moonc = color(50,110,140);
  starc = color(125);
  def = color(230);
  blc = color(0);
  
  count = 100;
  
  //snow
  for (var i = 0; i < 1000; i++) {
    snows.push(new Snow(random(width), -10, random(-1, 1), random(-8, 2), random(99, 100), random(0.9,0.99)));
  }
  
  //star
  var clr = color(242,230,130);
  for (var i = 0; i < 15; i++) {
    blobs.push( new Blob(random(0.1*width,0.9*width), random(0.1*height,0.3*height),clr) );
  }
  
  for(i = 0; i<width; i++){
    terrainx[i] = i;
    terrainy[i] = map(noise(i*0.01),0,1,0,150);
    terrainy2[i] = map(noise(i*0.01+200),0,1,0,120);
    terrainy3[i] = map(noise(i*0.01+200),0,1,0,90);
  }
  
  for (var x = 0; x < img.width; x += 1) {
    for (var y = 0; y < img.height; y += 1) {
      var index = (x + y * img.width) * 4;
      if (img.pixels[index] != 0) {
        var c = color(20, 20, 40);
        points.push(new Circle(img.width, img.height,x, y, color(c), color(250, 50, 50),0.485*width,0.55*height));
      }
    }
  }
  
  //flowers
  for(var i = 0; i<10;i++){
    flowers.push(new Flower(i,random(width),random(0.75*height,0.9*height),random(30,40)));
  }

}

function draw(){
  
  background(bkc);
  
  if(window.bird == true){
    drawbird();
  }
  if(window.sea == true){
    drawsea();
  }
  
  if(window.snow == true){
    drawsnow();
  }
  
  if(window.star == true){
    drawstar();
    bkc = lerpColor(bkc,starc,0.018);
  }else if(window.sun == true){
    drawsun();
    bkc = lerpColor(bkc,sunc,0.018);
  }else if(window.moon == true){
    drawmoon();
    bkc = lerpColor(bkc,moonc,0.018);
  }else{
    bkc = lerpColor(bkc,def,0.05);
  }
  
  if(window.mountain == true){
    drawmountains();
  }
  
  if(window.forest == true){
    drawforest();
    count = lerp(count,7,0.01);
  }else{
    count = 100;
  }
  
  if(window.flower == true){
    drawflower();
  }
  
  if(window.vanishnow == true){
    rectMode(CORNER);
    noStroke();
    fill(red(bkc),green(bkc),blue(bkc),tran);
    rect(0,0,width,height);
    flowfield();
    tran += 3;
    if(tran >= 250){
       bkc = lerpColor(bkc,blc,0.3);
    }
    if(points.length == 0){
      bkc = lerpColor(bkc,blc,0.8);
      bgm.stop();
    }
  }
}

function drawflower(){
  for(var i = 0; i<flowers.length;i++){
    flowers[i].display();
  }
}

class Flower{
  constructor(i,x,y,size){
    this.x = x;
    this.y = y;
    this.i = i;
    this.size = size;
  }
  
  display(){
    tint(255,sin(frameCount*0.05+this.i)*60+170);
    image(flower1, this.x,this.y,this.size,this.size);
  }
}


function drawsea(){
  push();
  var clr1 = color(145,195,220);
  var clr2 = color(140,198,210);
  drawWave(70, 6, 0.010,clr2);
  drawWave(90, 8, 0.011,clr1);
  drawWave(130, 12, 0.012,clr2);
  pop();
}



function drawWave(y, diaMax, value, clr) {
  push();
  translate(0, y);
  var freq, amp;
  for (var x = 0; x < width; x += RESOLUTION) {
    // sin for xOffset
    freq = frameCount * value;
    amp = width/2;
    var sinXOffset = sin(freq*0.5) * amp;

    // sin for amp
    freq = (frameCount) * value;
    amp = 20;
    var sinAmp = noise(freq*0.5) * amp;

    // sin for freq
    freq = frameCount * value;
    amp = 0.01;
    var sinFreq = sin(freq*0.5) * amp;
    // main sine wave
    freq = (x + sinXOffset) * sinFreq;
    amp = sinAmp;
    var sinValue = sin(freq*0.5) * amp;
    var y = height / 2 + sinValue;
    noStroke();
    fill(red(clr),green(clr),blue(clr),sin(y + frameCount*0.05)*50+100);
    ellipse(x, y, diaMax, diaMax);
  }

  pop();
}

function drawbird(){
  tint(255, 180 + sin(frameCount*0.05)*60);
  var k = frameCount*0.03;
  image(bird1,0.7* width, 0.2*height + sin(k)*5);
  image(bird2,0.65* width, 0.25*height +sin(1+k)*4);
  push();
  translate(0.2* width, 0.4*height +sin(2+k)*5);
  rotate(-PI/12);
  image(bird1,0,0, bird1.width * 0.6, bird1.height*0.6);
  pop();
}

function drawsnow() {
  for (var i = 0; i < snows.length; i++) {
    var force = createVector(sin(frameCount*0.05)*0.01);
    var s = snows[i];
    s.applyForce(force);
    s.run();
  }
}

function drawstar(){
  for (var i = 0; i < blobs.length; i++) {
    blobs[i].update(0.3,0.5);
    blobs[i].display();
  }
}

function drawsun(){
  noStroke();
  fill(255,140,100,80);
  ellipse(0.6*width,0.3*height,150,150);
}

function drawmoon(){
  noStroke();
  fill(240,240,100,120);
  ellipse(0.4*width,0.3*height,150,150);
  fill(bkc);
  ellipse(0.42*width,0.27*height,100,100);
}

function drawmountains(){
  for(var i = 0 ; i<terrainx.length;i++){
    var diff = noise(terrainx[i]*0.01)*10;
    stroke(80,110,80,20);
    line(terrainx[i],height*0.57+diff,terrainx[i],terrainy[i]+height*0.38);
    line(terrainx[i],height*0.57+diff,terrainx[i],terrainy2[i]+height*0.38);
    line(terrainx[i],height*0.57+diff,terrainx[i],terrainy3[i]+height*0.38);
  }
}

function drawforest(){
  for(var i = 0; i< 9; i++){
     tree(lens[i],widths[i],heights[i],diffs[i],clrs[i]);
  }
}

function tree(len, x,y,diff, c){
  push();
  translate(x, y);
  branch(len, diff+2, 0.004, c);
  pop();

  push();
  translate(x, y);
  branch(len+7, diff+6, 0.003, c);
  pop();
}

function branch(len, diff, windFreq,c) {
  var sw = map(len, 0, 200, 1, 30);
  strokeWeight(sw);
  stroke(c);
  line(0, 0, 0, -len);
  translate(0, -len);

  var angle1 = map(noise(diff), 0, 1, radians(0), radians(60));
  var angle2 = map(noise(diff+1), 0, 1, radians(0), radians(60));
  var noiseLength = map(noise(diff), 0, 1, 0.9, 1.1);
  len = len * 3 / 5 * noiseLength; 

  var noiseWind = map(noise(frameCount * windFreq), 0, 1, -0.05, 0.05);

  if (len > count) {
    push();
    rotate(angle1 + noiseWind);
    branch(len, diff + 0.3, windFreq * 1.1,c);
    pop();

    push();
    rotate(-angle2 + noiseWind); 
    branch(len, diff + 1, windFreq * 1.2,c);
    pop();
  }
}


function flowfield(){
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
  
  for(var i = 0; i<points.length;i++){
    var p = points[i];
    var r = floor(p.pos.x / RESOLUTION);
    var c = floor(p.pos.y / RESOLUTION);
    var index = r + c * rows;
    p.flow(angles[index]);
    p.update();
    p.color = lerpColor(p.color,bkc,0.03);
    p.show();
    p.checkEdges();
    if(p.dead){
      points.splice(i,1);
    }
  }
}
