// Import the functions you need from the SDKs you need
import { Vehicle } from "./vehicle.js";


function UrlExists(url) {
    var http = new XMLHttpRequest();
    let exists=false;
    try{
    http.open('HEAD', url, false);
    http.send();
    if (http.status==200) exists=true
    }
    catch(e){
    }
    return exists;
  }

function getJsonFiles(){
    let i=1;
    let exists=true;
    let file = "/GCLP/resources/data/v#.json";
    let files = new Array();
    while (exists){
        let f = file.replace("#",i);
        exists = UrlExists(f);
        if (exists) files.push(f);
        i++;
    }
    return files;
}

/*
export async function getVehicles2(vehicles) {
    let response = await fetch('/resources/data/vehicles.json');
    let vehicles = await response.json();

    vehicleList.forEach(v=>{
        var vehicle = new Vehicle(v.name,v.picture,v.w,v.h,null);
            vehicle.x = v.x;
            vehicle.y = v.y;
            vehicle.initialx=v.x;
            vehicle.initialy=v.y;
            vehicle.actions = v.actions;
            vehicle.currentAction = -1;
            vehicle.currentSegmentFlip = vehicle.getDirection();
            vehicles.push(vehicle);
    })

}*/


// Get a list of cities from your database
export function getVehicles(vehicles) {
    const jsonFiles = getJsonFiles();
    //var vehicleList;
    $.ajaxSetup({async: false});
    jsonFiles.forEach(file=>{
        $.getJSON(file, function( v ) {
            var vehicle = new Vehicle(v.name,v.picture,v.w,v.h,null);
            vehicle.x = v.x;
            vehicle.y = v.y;
            vehicle.initialx=v.x;
            vehicle.initialy=v.y;
            vehicle.actions = v.actions;
            vehicle.currentAction = -1;
            vehicle.currentSegmentFlip = v.currentSegmentFlip;// vehicle.getDirection();
            vehicles.push(vehicle);
            //vehicleList.push(vehicle)

        });

    })
    loadVehiclesToDOM(vehicles);
    vehicles.forEach(loadCard)
    $.ajaxSetup({async: true});
    return vehicles;
/*
    $.getJSON("/resources/data/vehicles.json", function( data ) {
        vehicleList=data;
    
  
    //const vehicleList = vehicleSnapshot.docs.map(doc => doc.data());

    vehicleList.forEach(v=>{
        var vehicle = new Vehicle(v.name,v.picture,v.w,v.h,null);
            vehicle.x = v.x;
            vehicle.y = v.y;
            vehicle.initialx=v.x;
            vehicle.initialy=v.y;
            vehicle.actions = v.actions;
            vehicle.currentAction = -1;
            vehicle.currentSegmentFlip = vehicle.getDirection();
            vehicles.push(vehicle);
    })
    $.getJSON("/resources/data/v1.json", function( v ) {
        var vehicle = new Vehicle(v.name,v.picture,v.w,v.h,null);
        vehicle.x = v.x;
        vehicle.y = v.y;
        vehicle.initialx=v.x;
        vehicle.initialy=v.y;
        vehicle.actions = v.actions;
        vehicle.currentAction = -1;
        vehicle.currentSegmentFlip = vehicle.getDirection();
        vehicles.push(vehicle);
        vehicleList.push(vehicle)
        loadVehiclesToDOM(vehicles);
        vehicles.forEach(loadCard)
        return vehicles;
    });
    
  

    });
*/
    
}

function loadVehiclesToDOM(vehicles){
    vehicles.forEach(v => {
      $('#preloadedImages').append('<img id="'+v.name+'" src="resources/img/'+v.picture+'" style="display:none;"/>')
    });
    
  }

  function loadCard(vehicle){
    var div = `
    <div  class="card">
    <div>{vehicle.name}:</div>
    <button onclick="javascript:vehicleAction('{vehicle.name}', 'move', this)" class="btn btn-outline-primary fs-5 py-0 px-1">
        <i class="bi bi-play"></i>
    </button>
    <div class="spinner-grow spinner-grow-sm text-primary d-none" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    `;
    div = div.replaceAll("{vehicle.name}",vehicle.name);
    $("#container").append(div);
    
    }
