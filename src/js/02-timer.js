
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

setDisabledAtr(refs.button);
refs.button.addEventListener('click', start);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose() {
    const isChosenDate = dates();
    if (isChosenDate < 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    Notify.success('Valid date chosen, press "Start"');
    removeAtrDisabled(refs.button);
  },
};

flatpickr(refs.inputDate, options);

function start() {
  setDisabledAtr(refs.button);
  setInterval(() => {
    const resultDate = dates();

    if (resultDate < 0) {
      return;
    }
    const timeComponents = convertMs(resultDate);
    return updateClockFace(timeComponents);
  }, 1000);
}

function dates() {
  const selectedDate = new Date(refs.inputDate.value).getTime();
  const currentTime = new Date().getTime();
  const deltaTime = selectedDate - currentTime;
  return deltaTime;
}


function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.min.textContent = minutes;
  refs.sec.textContent = seconds;
}

function setDisabledAtr(btn) {
  btn.setAttribute('disabled', 'true');
}

function removeAtrDisabled(btn) {
  btn.removeAttribute('disabled');
}