const delay = ms => new Promise(res => setTimeout(res, ms));

window.toggleButton = toggleButton;
window.getCursorPosition = getCursorPosition;
window.typeWriter = typeWriter;

function toggleButton(button, action=null){
    if (action==null){
      if ($(button).hasClass('d-none') ){
        action="show";
      }
      else{
        action="hide";
      }
    }

    if (action=="show"){
      $(button).removeClass('d-none');
      $(button).next().addClass('d-none');
      $("button").prop("disabled",false);
    }
    else if (action=="hide"){
      $(button).addClass('d-none');
      $(button).next().removeClass('d-none');
      $("button").prop("disabled",true);
    }
  }

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
  }


//var i = 0;
//var txt = 'Lorem ipsum dummy text blabla.';
var textSpeed = 70;

function typeWriter(txt, i=0, speaker="") {
  if (i==0) {
    document.getElementById("typeText").innerHTML="";
    document.getElementById("speaker").innerHTML=speaker;
  };
  if (i < txt.length) {
    document.getElementById("typeText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(function(){
      typeWriter(txt, i);
    }, textSpeed)
    //setTimeout(typeWriter, speed);
  }
}