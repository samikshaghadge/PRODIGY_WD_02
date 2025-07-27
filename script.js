let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];//This initializes time units to 0
let display = document.getElementById("time_display");
let lapsContainer = document.getElementById("laps");
let timer = null;//timer will store the interval reference (so we can stop it).
let lapCount = 0;//lapCount keeps track of how many laps have been recorded.


function stopwatch() {//This function is called every 10ms. Each call adds 10ms.
  milliseconds += 10;
  if (milliseconds === 1000) {//When milliseconds reach 1000, we reset milliseconds to 0 and increase seconds by 1.
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {//When 60 seconds is reached, reset seconds and increase minutes.
      seconds = 0;
      minutes++;
      if (minutes === 60) {//after 60 minutes, increment hours
        minutes = 0;
        hours++;
      }
    }
  }
//Pads each unit with a leading zero if it's less than 10.
//E.g. 5 becomes "05".
  let hr = hours < 10 ? "0" + hours : hours;
  let min= minutes < 10 ? "0" + minutes : minutes;
  let sec = seconds < 10 ? "0" + seconds : seconds;
  //Pads milliseconds with leading zeros to always have 3 digits (e.g. 5 → 005, 90 → 090).
  let ms = milliseconds < 10
    ? "00" + milliseconds
    : milliseconds < 100
    ? "0" + milliseconds
    : milliseconds;

  display.innerText = `${hr}:${min}:${sec}.${ms}`;
}

//When the Start button is clicked:
//First clear any existing interval to avoid duplicates.
//Then setInterval(stopwatch, 10) runs stopwatch() every 10 milliseconds.
document.getElementById("start").addEventListener("click", () => {
  if (timer !== null) clearInterval(timer);
  timer = setInterval(stopwatch, 10);
});

document.getElementById("stop").addEventListener("click", () => {
  clearInterval(timer);
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];//Resets all time units to zero.
  display.innerText = "00:00:00.000";
  lapsContainer.innerHTML = "";//clears all the recorded laps
  lapCount = 0;//Resets lap counter.
});

document.getElementById("lap").addEventListener("click", () => {
  if (timer === null) return;

  lapCount++;
  const lapTime = display.innerText;
  const lapElement = document.createElement("li");
  lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapsContainer.prepend(lapElement); 
});
