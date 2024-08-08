
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let timerId = null;
let isTimerActive = false;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    if (isTimerActive) {
      this.close();
      }
    },
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            document.querySelector('button[data-start]').disabled = true;
        } else {
            document.querySelector('button[data-start]').disabled = false;
        }
    },
};

flatpickr('#datetime-picker', options);

document.querySelector('button[data-start]').addEventListener('click', startTimer);

function startTimer() {
  isTimerActive = true;
  document.querySelector('button[data-start]').disabled = true;
  document.getElementById('datetime-picker').disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0, 0, 0, 0);
      document.querySelector('button[data-start]').disabled = false;
      document.getElementById('datetime-picker').disabled = false;
      isTimerActive = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


