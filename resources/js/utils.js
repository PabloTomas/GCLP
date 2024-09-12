const delay = ms => new Promise(res => setTimeout(res, ms));

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
    }
    else if (action=="hide"){
      $(button).addClass('d-none');
      $(button).next().removeClass('d-none');
    }
  }

  
  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
  }