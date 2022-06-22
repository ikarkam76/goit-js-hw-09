import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerBlock = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

timerBlock.style.display = 'flex';
timerField.forEach(elem => {
  elem.style.margin = '10px';
  elem.style.display = 'flex';
  elem.style.flexDirection = 'column';
  elem.style.color = 'blue';
  elem.firstElementChild.style.textAlign = 'center';
  elem.firstElementChild.style.fontSize = '30px';
});

timeInput.addEventListener(
  'input',
  flatpickr(timeInput, options)
);

