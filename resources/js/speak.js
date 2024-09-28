var voices="";
function loadVoices() {
  // Fetch the available voices.
  console.log("loading voices...")
	voices = speechSynthesis.getVoices();
}

window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};

function speak2(v, action){
    //const voices = synth.getVoices();
    if (voices==""){
      console.log("No voices found on device");
    }

    const utterThis = new SpeechSynthesisUtterance(action.speak);
       
    if (v.voice==null){
      let voices_ES = voices.filter(voice=>{return voice.lang.includes("es-ES") })
      if (voices_ES.length==0){
        console.log("No voices from Spain found");
        voices_ES = voices.filter(voice=>{return voice.lang.includes("es") })
      }
      if (voices_ES.length==0){
        console.log("No spanish voices found");
        voices_ES = voices;
      }
      v.voice = voices_ES[Math.floor(Math.random()*voices_ES.length)];

      console.log("selected voice: " + v.voice.name);
    }
    
    utterThis.voice = v.voice;
    utterThis.lang="es-ES";
    console.debug("voice:"+utterThis.voice.name);
    
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
    return new Promise( resolve =>{
          utterThis.onend = resolve
      })
    //runSequence(v);
  }
  

  