import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let intervalID = null;

const ref = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

ref.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'l, j F Y, H:i',
  onClose(selectedDates) {
    disabledBtnStart(selectedDates[0]);

    ref.btnStart.addEventListener(
      'click',
      onBtnStartClick.bind(this, selectedDates[0])
    );
  },
};

flatpickr('#datetime-picker', options);

function disabledBtnStart(selectedDate) {
  if (!ckeckCorrectDate(selectedDate)) {
    ref.btnStart.disabled = true;
    return;
  }

  ref.btnStart.disabled = false;
}

function ckeckCorrectDate(selectedDate) {
  const currentData = new Date();
  if (currentData > selectedDate) {
    Notify.failure('Please choose a date in the future');
    return false;
  }

  return true;
}
function onBtnStartClick(selectedDate) {
  ref.btnStart.disabled = true;
  clearInterval(intervalID);

  intervalID = setInterval(() => {
    const restTime = selectedDate - Date.now();

    timerValueMarkup(convertMs(restTime));

    if (restTime < 1000) {
      clearInterval(intervalID);
    }
  }, 1000);
}

function timerValueMarkup({ days, hours, minutes, seconds }) {
  ref.days.textContent = addLeadingZero(days);
  ref.hours.textContent = addLeadingZero(hours);
  ref.minutes.textContent = addLeadingZero(minutes);
  ref.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
