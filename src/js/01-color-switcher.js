const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerID = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const colorSwitcher = () => {
    const body = document.querySelector('body');
    if (!startButton.disabled) {
        startButton.setAttribute('disabled', 'true');
        stopButton.removeAttribute('disabled');
        timerID = setInterval(() => {
            body.style.backgroundColor = getRandomHexColor();
        }, 1000);
        return
    };
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'true');
    clearInterval(timerID);
};

startButton.addEventListener('click', colorSwitcher);
stopButton.addEventListener('click', colorSwitcher);