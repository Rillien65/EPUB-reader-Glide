const audio = document.getElementById("audio");
const speedDisplay = document.getElementById("speed");

// Load audio from Firebase
audio.src = "https://yourfirebaseurl.com/audio.mp3";

function changeSpeed(delta) {
  let newSpeed = Math.max(0.5, Math.min(2.0, audio.playbackRate + delta));
  audio.playbackRate = newSpeed;
  speedDisplay.textContent = `${newSpeed.toFixed(1)}x`;
}
