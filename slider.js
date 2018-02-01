//Created by Cole Hemp(GamePlayerCole)
//sliders.js
//javascript controls to connect the distanceSlider and distanceValue inputs
//Javascript must be loaded at the end of the html document. Otherwise, console will throw an error.

var slider = document.getElementById("distanceSlider");
var output = document.getElementById("distanceValue");
output.innerHTML = document.getElementById("distanceSlider").value;


slider.oninput = function() {
  output.value = this.value;
}
output.oninput = function() {
  if (0 < this.value && this.value < 26)
  {
    slider.value = this.value;
  }
  else if (this.value == "") {
    //do nothing
  }
  else
  {
    alert("Invalid distance. Select a distance 25 miles and under.");
  }
}
