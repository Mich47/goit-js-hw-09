import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
let intervalID = null;
console.log('btnStart ', btnStart);
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'l, j F Y, H:i',
  onClose(selectedDates) {
    const currentData = new Date();
    if (!(currentData < selectedDates[0])) {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      console.log(selectedDates[0]);
      return;
    }
    btnStart.disabled = false;

    // clearInterval(intervalID);
    btnStart.addEventListener('click', () => {
      btnStart.disabled = true;
      intervalID = setInterval(() => {
        const restTime = selectedDates[0] - Date.now();
        console.log(convertMs(restTime));
        if (restTime < 1000) {
          clearInterval(intervalID);
          btnStart.disabled = false;
        }
      }, 1000);
    });
  },
};

flatpickr('#datetime-picker', options);

function restData(firstData) {
  return convertMs(firstData - Date.now());
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
