
function loadVehicles(vehicles){
    //var vehicles = new Array();
    $.ajaxSetup({
        async: false
    });
    $.getJSON("./resources/js/vehicles.json", function(json) {
        var vs = json.vehicles;

        vs.forEach(v => {
            var vehicle = new Vehicle(v.name,v.picture,v.w,v.h,null);
            vehicle.x = v.x;
            vehicle.y = v.y;
            vehicle.initialx=v.x;
            vehicle.initialy=v.y;
            vehicle.actions = v.actions;
            vehicle.currentAction = -1;
           // vechicle.x = v.
            vehicles.push(vehicle);
            //console.log(v);
        });
        //console.log(vs); // this will show the info it in firebug console
    });
    $.ajaxSetup({
        async: true
    });
    loadVehiclesToDOM(vehicles);
}



function loadVehiclesToDOM(vehicles){
  vehicles.forEach(v => {
    $('#preloadedImages').append('<img id="'+v.name+'" src="resources/img/'+v.picture+'" style="display:none;"/>')
  });
  
}