var originLatitude;
var originLongitude;

Radar.initialize("prj_live_pk_5788f570020b433e564190f2992e01a5921aa394");
  
        Radar.ipGeocode(function(err, result) {
          if (err) {
            console.error(err);
  
            return;
          }
  
          if (result && result.address) {
            originLatitude = result.address.lattitude;
            originLongitude = result.address.longitude;  
            console.log(result.address);
          }
        });


function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 45.426020, lng: -75.681210 },
  });
  var markerLatlng = new google.maps.LatLng(45.412500,-75.673200);
  var marker = new google.maps.Marker({
    position: markerLatlng,
    title:"Medium Risk Area"
  });
  var markerMintoLatlng = new google.maps.LatLng(45.420536,-75.677267);
  var markerMinto = new google.maps.Marker({
    position: markerMintoLatlng,
    title:"High Risk Area"
  });

  var markerNigerianHCLatlng = new google.maps.LatLng(45.415837,-75.690900);
  var markerNigerianHC = new google.maps.Marker({
    position: markerNigerianHCLatlng,
    title:"Medium Risk Area"
  });

  var markerPopeyesLatlng = new google.maps.LatLng(45.405765,-75.689980);
  var markerPopeyes = new google.maps.Marker({
    position: markerPopeyesLatlng,
    title:"High Risk Area"
  });

  var markerShawCenterLatlng = new google.maps.LatLng(45.424480,-75.691603);
  var markerShawCenter = new google.maps.Marker({
    position: markerShawCenterLatlng,
    title:"High Risk Area"
  });

  marker.setMap(map)
  markerMinto.setMap(map)
  markerNigerianHC.setMap(map)
  markerPopeyes.setMap(map)
  markerShawCenter.setMap(map)
  const cityCircle = new google.maps.Circle({
    strokeColor: "#FFFF00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFF00",
    fillOpacity: 0.35,
    map,
    center: { lat: 45.412500, lng: -75.673200 },
    radius: 250,
  });

  const MintoCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: { lat: 45.420536, lng: -75.677267 },
    radius: 200,
  });

  const NigerianHCCircle = new google.maps.Circle({
    strokeColor: "#FFFF00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFF00",
    fillOpacity: 0.35,
    map,
    center: { lat: 45.415837, lng: -75.690900 },
    radius: 300,
  });

  const PopeyesCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: { lat: 45.405765, lng: -75.689980 },
    radius: 175,
  });

  const ShawCenterCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: { lat: 45.424480, lng: -75.691603 },
    radius: 200,
  });

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById('directionsPanel'));
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  document.getElementById("mode").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
  
}

function getLatLong(originLat, originLon){
  originLatitude = originLat;
  originLongitude = originLon;
  console.log(originLat);
  console.log(originLon);
}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;
  directionsService.route(
    {
      origin: { lat: 45.423208, lng: -75.683164 },
      destination: { lat: 45.411169, lng: -75.692518 },
      provideRouteAlternatives: true,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode],
    },
    (response, status) => {
      if (status == "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
