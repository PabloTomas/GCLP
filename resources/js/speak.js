async function speak2(v, action){
    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(action.speak);
    
    if (v.voice==null){
      const voices_ES = voices.filter(voice=>{return voice.lang.includes("es-ES") })
      v.voice = voices_ES[Math.floor(Math.random()*voices_ES.length)];

      /*
      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name.includes("Pablo")) {
          v.voice = voices[i];
        }
      }*/

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
  