import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startTimer = document.querySelector('[data-start]');
startTimer.setAttribute('disabled', 'true');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let timerValueMs = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] - Date.now() <= 0) {
        startTimer.setAttribute('disabled', 'true');
        window.alert("Please choose a date in the future");
        };

      if (selectedDates[0] - Date.now() > 0) {
          startTimer.removeAttribute('disabled');
          timerValueMs = selectedDates[0] - Date.now();
        };
    },
};
flatpickr("#datetime-picker", options);

const convertMs = (ms) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

const addLeadingZero = (value) => {
    value.days = value.days.toString().padStart(2, '0');
    value.hours = value.hours.toString().padStart(2, '0');
    value.minutes = value.minutes.toString().padStart(2, '0');
    value.seconds = value.seconds.toString().padStart(2, '0');
};

const startingTimer = (timerValue) => {
    setInterval(() => {
        const time = convertMs(timerValue);
        addLeadingZero(time);
        timerDays.textContent = time.days
        timerHours.textContent = time.hours
        timerMinutes.textContent = time.minutes
        timerSeconds.textContent = time.seconds
        timerValue -= 1000;
    }, 1000);

};

startTimer.addEventListener('click', () => {
    startingTimer(timerValueMs);
});