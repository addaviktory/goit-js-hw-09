import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minEl: document.querySelector('[data-minutes]'),
  secEl: document.querySelector('[data-seconds]'),
};

setDisabledAttribute(refs.btnEl);
refs.btnEl.addEventListener('click', start);

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
    removeAttributeDisabled(refs.btnEl);
  },
};
////
flatpickr(refs.inputDateEl, options);

function start() {
  setDisabledAttribute(refs.btnEl);
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
  const selectedDate = new Date(refs.inputDateEl.value).getTime();
  const currentTime = new Date().getTime();
  const deltaTime = selectedDate - currentTime;
  return deltaTime;
}

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

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minEl.textContent = minutes;
  refs.secEl.textContent = seconds;
}

function setDisabledAttribute(btn) {
  btn.setAttribute('disabled', 'true');
}

function removeAttributeDisabled(btn) {
  btn.removeAttribute('disabled');
}