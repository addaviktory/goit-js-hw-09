
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

  setDisabledAtr(refs.button)
  refs.button.addEventListener('click', start)

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose() {
      const isShowDate = dates();
      if (isShowDate < 0) {
        Notify.failure('Please choose a date in the future');
        return;
      }
      Notify.success('Valid date chosen, press "Start"');
      removeAttributeDisabled(refs.btnEl);
    },
  };
  flatpickr(refs.inputDate, options)

  function start(){
    setDisabledAtr(refs.button)
    setInterval(() =>{
      const  res = dates();
    if(res < 0){
    return
}
const componentTime = convertMs(res)
return updateClockFace(timeComponents)
    }, 1000)
  }

function dates() {
    const selectedDate = new Date(refs.inputDate.value).getTime();
    const currentTime = new Date().getTime();
    const deltaTime = selectedDate - currentTime;
    return deltaTime;
  }



  function pad(value) {
    return String(value).padStart(2, '0');
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
  
  function removeAttributeDisabled(btn) {
    btn.removeAttribute('disabled');
  }