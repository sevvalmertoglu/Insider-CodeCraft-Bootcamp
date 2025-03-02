let countdown;
let timeRemaining;
const countdownDisplay = document.getElementById("countdown");
const timeInput = document.getElementById("timeInput");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const errorMessage = document.getElementById("error-message");
        
function validateInput() {
    let value = timeInput.value.trim();

    if (value === "" || value < 1) {
        errorMessage.style.display = "block";
        timeInput.value = "";
    } else {
        errorMessage.style.display = "none";
    }
}

function startCountdown() {
    let value = timeInput.value.trim();

    if (value === "" || value < 1) {
        errorMessage.style.display = "block";
        return;
    }

    errorMessage.style.display = "none";
    clearInterval(countdown);
    timeRemaining = value || 10;
    countdownDisplay.textContent = timeRemaining;

    countdown = setInterval(() => {
        timeRemaining--;
        countdownDisplay.textContent = timeRemaining;
                
        if (timeRemaining <= 0) {
            clearInterval(countdown);
            countdownDisplay.textContent = "Time's up!";
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdown);
    timeInput.value = "10";
    countdownDisplay.textContent = "10";
}

startButton.addEventListener("click", startCountdown);
resetButton.addEventListener("click", resetCountdown);