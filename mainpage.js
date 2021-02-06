
function initMap() {

       const input = document.getElementById("pac-input");

        const options = {
        componentRestrictions: { country: "ca" },
        fields: ["formatted_address", "geometry", "name"],
      //  origin: map.getCenter(),
        strictBounds: true,
        types: ["establishment"],
      };

      const autocomplete = new google.maps.places.Autocomplete(input, options);

      autocomplete.addListener("place_changed", () => {

        const place = autocomplete.getPlace();
    
        if (!place.geometry) {

          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
      });
    }