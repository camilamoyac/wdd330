const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');

let timeLeft = 10;

startButton.addEventListener('click', () => {
  setInterval(() => {
    if (timeLeft >= 0) {
      countdownDisplay.textContent = timeLeft;
      timeLeft--;
    } else {
      countdownDisplay.textContent = "Time is up!";
    }
  }, 1000); 
});