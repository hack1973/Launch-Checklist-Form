// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let faultyItems = document.getElementById('faultyItems');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let launchStatus = document.getElementById('launchStatus');
   let missionTarget=document.getElementById("missionTarget");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then( function(json) {
         //const div = document.getElementById("missionTarget"); 
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[2].name}</li>
                  <li>Diameter: ${json[2].diameter}</li>
                  <li>Star: ${json[2].star}</li>
                  <li>Distance from Earth: ${json[2].distance}</li>
                  <li>Number of Moons: ${json[2].moons}</li>
               </ol>
               <img src="${json[2].image}"></img>
         `;
      }); 
   });  

   form.addEventListener("submit", function(event) {
      //event.preventDefault();
      
      /*faultyItems.style.visibility = 'invisible';
      pilotStatus.innerHTML = 'Pilot Ready';
      copilotStatus.innerHTML = 'Co-pilot Ready';
      fuelStatus.innerHTML = 'Fuel level high enough for launch';
      fuelStatus.style.color = "black";
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      launchStatus.style.color = "black";
      cargoStatus.innerHTML = 'Cargo mass low enough for launch';
      cargoStatus.style.color = "black";*/


      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (!isNaN(Number(pilotName.value))  || !isNaN(Number(copilotName.value))) {
         alert("Please enter correct 'Text' value type in 'Pilot Name' and 'Co-Pilot Name' fields!");
         event.preventDefault();
      } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
         alert("Please enter correct 'Number' value type in 'Fuel Level' and 'Cargo Mass' fields!");
         event.preventDefault(); 
      } else {
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
      };   
      

      if (fuelLevel.value < 10000) {
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = 'Fuel level NOT high enough for launch';
         fuelStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         event.preventDefault();
      } else if (cargoMass.value > 10000) {
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = 'Cargo mass too HIGH for launch';
         cargoStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         event.preventDefault();
      } else if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
         faultyItems.style.visibility = 'visible';
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";
         event.preventDefault();
      }
      
   });    
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
