
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



const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");
const micBtn = searchForm.querySelector("button");
const micIcon = micBtn.querySelector("i");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
console.log("Your Browser supports speech Recognition");

const recognition = new SpeechRecognition();
recognition.continuous = true;
// recognition.lang = "en-US";

micBtn.addEventListener("click", micBtnClick);
function micBtnClick() {
  if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
    recognition.start(); // First time you have to allow access to mic!
  }
  else {
    recognition.stop();
  }
}

recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
function startSpeechRecognition() {
  micIcon.classList.remove("fa-microphone");
  micIcon.classList.add("fa-microphone-slash");
  searchFormInput.focus();
  console.log("Voice activated, SPEAK");
}

recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
function endSpeechRecognition() {
  micIcon.classList.remove("fa-microphone-slash");
  micIcon.classList.add("fa-microphone");
  searchFormInput.focus();
  console.log("Speech recognition service disconnected");
}

recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
function resultOfSpeechRecognition(event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  
  if(transcript.toLowerCase().trim()==="stop recording") {
    recognition.stop();
  }
  else if(!searchFormInput.value) {
    searchFormInput.value = transcript;
  }
  else {
    if(transcript.toLowerCase().trim()==="go") {
      searchForm.submit();
    }
    else if(transcript.toLowerCase().trim()==="reset input") {
      searchFormInput.value = "";
    }
    else {
      searchFormInput.value = transcript;
    }
  }
  // searchFormInput.value = transcript;
  // searchFormInput.focus();
  // setTimeout(() => {
  //   searchForm.submit();
  // }, 500);
}

info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';

}
else {
console.log("Your Browser does not support speech Recognition");
info.textContent = "Your Browser does not support Speech Recognition";
}