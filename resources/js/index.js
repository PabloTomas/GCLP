const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const synth = window.speechSynthesis;

const speed = 2;
let imagesCanvas = {};

var cfx=40;
var cfy=155;

const vw=70;
const vh=45;
let vehicles = new Array();

async function vehicleAction(name, action, button){
  //console.log(button);
  toggleButton(button, "hide");
 // $("cf").prop("disabled",true);
  let v = vehicles.find(_v => _v.name==name)
  v.button = button;
  //New functionality for actions instead of segments
  if (v.currentAction != null){
    await runSequence(v);
    //return;
  }
  else if (action=="move"){
    if (v.moving==false){//& v.segments.length > v.currentSegment){
      console.log("Moving to x:" + action.x + " y:"+action.y)
	    anima(v);
    }
	  //return;
  }
  else if (action=="speak"){
    console.log("texto: " + action.text)
	  speak(v);
	  //return;
  }
  toggleButton(button, "show");
}

const runSequence = async function(v){
    try{
      toggleButton(v.button, "hide");
      v.currentAction++;
      if (v.currentAction+1  > v.actions.length)
      {
        v.x = v.initialx;
        v.y = v.initialy;
        v.currentAction=-1;
        updateScene();
        return;
      }
      var stop=false;
      var action;
      //while (stop==false || v.actions.length==v.currentAction+1){

        action = v.actions[v.currentAction];
        console.log("Acción " + v.currentAction + ": " +action.type);
        switch (action.type){
          case "move":
              await anima2(v);
              toggleButton(v.button, "show")
            break;
          case "wait":
            if (action.time!=null){
              await delay(action.time*1000);
            }else{

              stop=true;
            }
            toggleButton(v.button, "show")
            break;
          case "speak":
              typeWriter(action.text, 0, v.name.toUpperCase());
              await speak2(v,action);
              runSequence(v);
              //toggleButton(v.button, "hide")
        }
        
        //v.currentAction++;
      //}
        
    }    
    catch(e){
      console.log("Error: "+e)
    }
}


const anima2= function(car1) { 

  var td;
  var xfactor;
  var yfactor;
  var continueMoving=false;
  var action = car1.actions[car1.currentAction];
  toggleButton(car1.button,"hide");
  if (action.x ==null){
    console.log("Error, acción fuera de secuencia")
    console.log(car1);
    return;
  }
  car1.finalx = action.x;
  car1.finaly = action.y;

  var td = Math.sqrt((car1.finalx-car1.x)**2+(car1.finaly-car1.y)**2);
  var distX = car1.finalx-car1.x;
  var distY = car1.finaly-car1.y;
  var xfactor = distX/td 
  var yfactor = distY/td 

  var xspeed = speed * xfactor;
  var yspeed = speed * yfactor;

  if (distX!=0){
    car1.x += xspeed;
    if (Math.abs(distX)<Math.abs(xspeed)) car1.x= car1.finalx;
    continueMoving=true;
  }

  //check vertical distance left and move
  if (distY!=0){
    car1.y += yspeed;
    if (Math.abs(distY)<Math.abs(yspeed)) car1.y= car1.finaly;
    continueMoving=true;
  }

  updateScene();

  if (continueMoving){
    requestAnimationFrame (function() {
      anima2(car1);
    });
  }
  else{
    car1.moving=false;
    toggleButton(car1.button,"show");
    runSequence(car1);
  
  }
}


function updateScene(){
  addBackground();
  vehicles.forEach(drawCar);
}

function drawCar(car){
  //let imageCtx = imagesCanvas[car.name].getContext('2d');
  //imageCtx.drawImage(imagesCanvas[car.name], car.x, car.y);
  if (car.w>100){
    var offset=0;
    if (car.getDirection()>0) {offset=70};
    ctx.drawImage(imagesCanvas[car.name],offset,0,65,40, car.x, car.y,65,40);
    
  }else{
    ctx.drawImage(imagesCanvas[car.name], car.x, car.y);
  }
  //ctx.drawImage(imagesCanvas[car.name], car.x, car.y);
}

function addCar(car) {
  let name = car.name;
  if (imagesCanvas[name] === undefined) {
    imagesCanvas[name] = document.createElement('canvas');
  }
  imagesCanvas[name].width = car.w;
  imagesCanvas[name].height = car.h;

  let image = document.getElementById(name);
  let i= new Image(car.w, car.h);
  i.src="resources/img/"+car.picture;

  let imageCtx = imagesCanvas[name].getContext('2d');
  imageCtx.save();
  
  imageCtx.clearRect(0, 0, car.w, car.h);
  
  imageCtx.drawImage(image, 0, 0, car.w, car.h);
  imageCtx.restore();

  if (car.w>100){
	var offset=0;
	if (car.getDirection()>0) {offset=70};
    ctx.drawImage(imagesCanvas[name],offset,0,65,40, car.x, car.y,65,40);
  }else{
    ctx.drawImage(imagesCanvas[name], car.x, car.y);
  }
  
}

function addBackground(){
  let name = "planoGCLP";
  let w =1917;
  let h = 804;
  if (imagesCanvas[name] === undefined) {
    imagesCanvas[name] = document.createElement('canvas');
  }

  imagesCanvas[name].width = w;
  imagesCanvas[name].height = h;

  let image = document.getElementById(name);

  let imageCtx = imagesCanvas[name].getContext('2d');
  imageCtx.clearRect(0, 0, w, h);
  imageCtx.drawImage(image, 0, 0, w, h);  
  ctx.drawImage(imagesCanvas[name], 0, 0);
}

function drawCanvas() {
  ctx.fillStyle = 'rgb(0,0,0)';
}

function play(){
  addBackground();
  console.log(vehicles);
  vehicles.forEach(addCar);
  const canvas = document.querySelector('canvas')
    canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
  })
}

window.addEventListener('load', function () {
  loadVehicles(vehicles);
  this.setTimeout(play,100)
  //play();
})