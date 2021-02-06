//let map;

function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}
function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin:start,
    destination:end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(response);
    }
  });
}
// const calculateAndRenderDirections = (origin, destination) => {
//   let directionsService = new google.maps.DirectionsService(),
//       directionsDisplay = new google.maps.DirectionsRenderer(),
//       request = { origin: origin,
//                   destination: destination,
//                   travelMode: 'BICYCLING'
//                 }
//       directionsDisplay.setMap(map);
//       directionsService.route(request, (result, status) => {
//       if (status == 'OK'){
//         directionsDisplay.setDirections(result)
//       }
//     })
// }

// let map;
//         document.addEventListener("DOMContentLoaded", () => {
//             let s = document.createElement("script");
//             document.head.appendChild(s);
//             s.addEventListener("load", () => {
//                 //script has loaded
//                 console.log("script has loaded");
//                 map = new google.maps.Map(document.getElementById("map"), {
//                     center: {
//                         lat: 45.3496711,
//                         lng: -75.7569551
//                     },
//                     zoom: 16,
//                     mapTypeId: google.maps.MapTypeId.ROADMAP
//                 });
//             });
//             //s.src = "https://maps.googleapis.com/maps/api/directions/json?origin=24+Sussex+Drive+Ottawa+ON&destination=CWC8%2BR9%20Mountain%20View%20CA%20USA&key=AIzaSyC-E7_Hys0JoyK3lcrYXqzOo9eJIo1I_9Q&callback=initMap&libraries=places&v=weekly"
//             //s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-E7_Hys0JoyK3lcrYXqzOo9eJIo1I_9Q&callback=initMap&libraries=places&v=weekly"
//           });

