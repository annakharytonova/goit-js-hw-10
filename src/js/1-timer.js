import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');

const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const now = new Date();

    if (userSelectedDate < now) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#FF0000',
        icon: `<img src="${errorImage}" alt="Error icon" />`,
      });
      startBtn.disabled = true;
    } else if (userSelectedDate > now) {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.disabled = true;

function startTimer() {
  startBtn.disabled = true;
  inputDate.disabled = true;

  const intervalId = setInterval(() => {
    const deltaTime = userSelectedDate - Date.now();

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      inputDate.disabled = false;
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
    } else {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      daysElem.textContent = days;
      hoursElem.textContent = hours;
      minutesElem.textContent = minutes;
      secondsElem.textContent = seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

startBtn.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer();
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
