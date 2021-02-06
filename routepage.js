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
  marker.setMap(map)
  markerMinto.setMap(map)
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
    radius: 350,
  });


  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById('directionsPanel'));
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  document.getElementById("mode").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;
  directionsService.route(
    {
      origin: { lat: 45.426020, lng: -75.681210 },
      destination: { lat: 45.403220, lng: -75.688260 },
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
