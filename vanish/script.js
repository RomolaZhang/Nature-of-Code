function complete(){
  var x = document.getElementsByClassName("container");
  var i;
  for (i = 0; i < x.length; i++) {
      x[i].style.animation = "none";
      x[i].style.animation = "disappear 1 2s forwards";
  }
  setTimeout(function(){window.vanishnow = true;
  var man = document.getElementById("character");
  man.style.animation = "none";
  man.style.animation = "disappear 1 0.5s forwards";},2000);
}

function sunf(){
	if(window.sun == false){
	window.sun = true;
	window.moon =false;
	window.star = false;
    }else{
    	window.sun = false;
    }
}

function moonf(){
	if(window.moon == false){
	window.moon = true;
	window.star = false;
	window.sun = false;
}else{
	window.moon =false;
}
}

function starf(){
	if(window.star == false){
	window.star = true;
	window.sun = false;
	window.moon =false;
}else{
	window.star = false;
}
}

function seaf(){
	if(window.sea == false){
	window.sea = true;
}else{
	window.sea = false;
}
}

function mountainf(){
	if(window.mountain == false){
	window.mountain = true;
}else{
	window.mountain = false;
}
}

function forestf(){
	if(window.forest == false){
	window.forest = true;
}else{
	window.forest = false;
}
}

function birdf(){
	if(window.bird == false){
	window.bird = true;
   }else{
	window.bird = false;
  }
}

function snowf(){
	if(window.snow == false){
	window.snow = true;
}else{
	window.snow = false;
}
}

function flowerf(){
	if(window.flower == false){
	window.flower = true;
}else{
    window.flower = false;
}
}


