let startTime = 0, timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function updateDisplay(elapsed) {
  let totalMicro = Math.floor(elapsed * 1000); // convert ms to µs

  let hours = Math.floor(totalMicro / 3_600_000_000);
  let minutes = Math.floor((totalMicro % 3_600_000_000) / 60_000_000);
  let seconds = Math.floor((totalMicro % 60_000_000) / 1_000_000);
  let milliseconds = Math.floor((totalMicro % 1_000_000) / 1000);
  let microseconds = totalMicro % 1000;

  display.textContent =
    `${hours.toString().padStart(2, '0')}:` +
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}.` +
    `${milliseconds.toString().padStart(3, '0')}` +
    `${microseconds.toString().padStart(3, '0')}`;
}

startBtn.onclick = () => {
  if (!isRunning) {
    startTime = performance.now() - (startTime || 0);
    timerInterval = setInterval(() => {
      let now = performance.now();
      updateDisplay(now - startTime);
    }, 10); // refresh every 10ms
    isRunning = true;
  }
};

stopBtn.onclick = () => {
  clearInterval(timerInterval);
  isRunning = false;
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  isRunning = false;
  startTime = 0;
  updateDisplay(0);
  lapsList.innerHTML = "";
  lapCount = 0;
};

lapBtn.onclick = () => {
  if (isRunning) {
    let now = performance.now();
    lapCount++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${display.textContent}`;
    lapsList.appendChild(li);
  }
};
