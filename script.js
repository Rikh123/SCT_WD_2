// Selecting Elements
const display = document.querySelector(".display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.querySelector(".laps");

let startTime = 0, elapsedTime = 0, timerInterval;
let running = false;

// Format time function
function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Update Display
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Start / Pause Function
function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.style.backgroundColor = "#f39c12";
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
        startPauseBtn.style.backgroundColor = "#28a745";
    }
    running = !running;
}

// Reset Function
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    display.textContent = "00:00:00.00";
    startPauseBtn.textContent = "Start";
    startPauseBtn.style.backgroundColor = "#28a745";
    lapsContainer.innerHTML = "";
}

// Lap Function
function addLap() {
    if (!running) return;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsContainer.appendChild(lapItem);
}

// Event Listeners
startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
