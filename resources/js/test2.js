const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const synth = window.speechSynthesis;
const voices = synth.getVoices();
const speed = 2;
let imagesCanvas = {};

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  console.log("x: " + x + " y: " + y)
}

function speak(vehicle){
  t_id=vehicle.segments[vehicle.currentSegment].stop;
  if (t_id==null) t_id=0
  text = vehicle.text[t_id];
  console.log(vehicle.currentSegment + " - " + text)
  const utterThis = new SpeechSynthesisUtterance(text);
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name.includes("Pablo")) {
      utterThis.voice = voices[i];
    }
  }
  utterThis.lang="es-ES";
  console.debug(utterThis.voice);
  
  utterThis.pitch = 1;
  utterThis.rate = 1;
  synth.speak(utterThis);
}

var cfx=40;
var cfy=155;

const vw=70;
const vh=45;
let vehicles = new Array();

vehicles.push(new Vehicle("cf","cf.png",vw,vh,
    new Array(
      new Segment(98,283),
      new Segment(1640,283,1),
      new Segment(1740,283)
    ),
    new Array(
      "Torre de control de fauna, permiso para cruzar punto de espera pista dos uno izquierda, puerta quilo y sierra 8",
      "Torre de control de fauna, permiso para cruzar punto de espera pista cero tres derecha"
    )
));
vehicles.push(new Vehicle("op7","op7.png",vw,vh,
    new Array(new Segment(1785,360),new Segment(1501,360)),
    new Array("Torre de oscar papa 7, permiso para cruzar zulu 7 y zulu 6")
));
vehicles.push(new Vehicle("v3","vx.png",135,25,new Array(new Segment(98,353),new Segment(400,353)),
    new Array("Torre de victor 3, permiso para cruzar sierra 7")));
vehicles.push(new Vehicle("h2","Hx.png",100,30,new Array(new Segment(1480,530),new Segment(180,530)),
  new Array("Torre de Hotel 2, permiso para rodar desde parque de bomberos hasta romeo 9 lima")
));
vehicles.push(new Vehicle("sm","vr.png",vw,vh,
    new Array(
      new Segment(480,260),
      new Segment(750,260),
      new Segment(830,285),
      new Segment(1400,285,1),
      new Segment(1400,285,2),
      new Segment(1400,285,3),
      new Segment(556,285),
    ),
    new Array(
      "Torre de Barrera, permiso para cruzar sierra 8",
      "Torre de Barrera, solicito levantamiento de cable retráctil",
      "Torre de Barrera, Cable arriba, puede bajarlo",
      "Torre de Barrera, le confirmo cable abajo y le solicito cruzar sierra 8"
    )
));
vehicles.push(new Vehicle("v4","vx.png",135,25,
  new Array(
    new Segment(495,520),
    new Segment(276,520),
    new Segment(222,491,1),
    new Segment(167,430),
    new Segment(1684,430),
    new Segment(1671,478),
    new Segment(1570,529,3)
  
  ),
  new Array(
    "Torre de Víctor 4, permiso para ocupar romeo 8 y romeo 9 para revisión de pista",
    "Víctor 4, manteniendo corto pista cero tres izquierda en romeo 9 romeo",
    "Víctor 4, ocupando pista cero tres izquierda, notificaré libre y operativa",
    "Torre de víctor 4, pista cero tres izquierda libre y operativa"
  )
));

function vehicleAction(name, action){
  let v = vehicles.find(_v => _v.name==name)
  if (action=="move"){
	  anima(v);
	  return;
  }
  if (action=="speak"){
	  speak(v);
	  return;
  }
}

function moveCar(carName){
  let car2 = vehicles.find(_car => _car.name==carName);
  console.debug(car2);
  anima(car2);
}

function di(name, x, y){
  ctx.rotate(Math.PI/2);
  ctx.drawImage(imagesCanvas[name],x,y);
}

var anima= function(car1) { 
  var continueMoving = false;
  //Draw the background of the canvas
  addBackground();

  var td;
  var xfactor;
  var yfactor;

  if (car1.moving == false){
    car1.moving=true;
    car1.x = car1.segments[car1.currentSegment].x;
    car1.y = car1.segments[car1.currentSegment].y;
    car1.finalx = car1.segments[car1.currentSegment+1].x;
    car1.finaly = car1.segments[car1.currentSegment+1].y;
  }

  var td = Math.sqrt((car1.finalx-car1.x)**2+(car1.finaly-car1.y)**2);
  var distX = car1.finalx-car1.x;
  var distY = car1.finaly-car1.y;
  var xfactor = distX/td 
  var yfactor = distY/td 

  var xspeed = speed * xfactor;
  var yspeed = speed * yfactor;

  //check horizontal distance left and move
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

  //Redraw all car positions
  vehicles.forEach(drawCar);

  if (continueMoving){
      requestAnimationFrame (function() {
        anima(car1);
      });
  }
  else{
    car1.moving=false;
    //Next segment?
    if (car1.currentSegment+2 < car1.segments.length){
      
      car1.currentSegment++;
      if (car1.segments[car1.currentSegment].stop == null){
        requestAnimationFrame (function() {
          anima(car1);
        });
      }
    }

  }
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
  //TODO: sprite test
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
  vehicles.forEach(addCar);
  const canvas = document.querySelector('canvas')
    canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
  })
  
}

window.onload = play;