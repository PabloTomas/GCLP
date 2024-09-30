// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js'
import { Vehicle } from "./vehicle.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9oheSz6bp9XS0FeKItrfY6N7KpwB5JMo",
    authDomain: "gclp-2a483.firebaseapp.com",
    projectId: "gclp-2a483",
    storageBucket: "gclp-2a483.appspot.com",
    messagingSenderId: "1072178747217",
    appId: "1:1072178747217:web:22f10336262e18a6b56570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
export async function getVehicles(vehicles) {
    const vehiclesCol = collection(db, 'vehicles');
    const vehicleSnapshot = await getDocs(vehiclesCol);
   
    const vehicleList = vehicleSnapshot.docs.map(doc => doc.data());

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
    loadVehiclesToDOM(vehicles);
   // console.log("vehicles:"+vehicleList);
    return vehicleList;
}

function loadVehiclesToDOM(vehicles){
    vehicles.forEach(v => {
      $('#preloadedImages').append('<img id="'+v.name+'" src="resources/img/'+v.picture+'" style="display:none;"/>')
    });
    
  }