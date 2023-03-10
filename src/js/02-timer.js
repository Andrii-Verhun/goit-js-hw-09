import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const startTimer = document.querySelector('[data-start]');
startTimer.setAttribute('disabled', 'true');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const resetTimer = document.createElement('button');
resetTimer.textContent = 'Reset';
resetTimer.setAttribute('type', 'button');
resetTimer.setAttribute('disabled', 'true');
startTimer.after(resetTimer);
let timerValueMs = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] - Date.now() <= 0) {
          Notiflix.Notify.failure('Please choose a date in the future');
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
    startTimer.setAttribute('disabled', 'true');
    resetTimer.removeAttribute('disabled');
    intervalId = setInterval(() => {
        const time = convertMs(timerValue);
        addLeadingZero(time);
        timerDays.textContent = time.days;
        timerHours.textContent = time.hours;
        timerMinutes.textContent = time.minutes;
        timerSeconds.textContent = time.seconds;
        timerValue -= 1000;
    }, 1000);

};

startTimer.addEventListener('click', () => {
    startingTimer(timerValueMs);
});

resetTimer.addEventListener('click', () => {
    resetTimer.setAttribute('disabled', 'true');
    clearInterval(intervalId);
    timerDays.textContent = '00';
    timerHours.textContent = '00';
    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';
});