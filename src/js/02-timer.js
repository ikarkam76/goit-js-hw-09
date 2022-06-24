import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button'),
  timerBlock: document.querySelector('.timer'),
  timerField: document.querySelectorAll('.field'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', 'disabled');
refs.timerBlock.style.display = 'flex';
refs.timerField.forEach(elem => {
  elem.style.margin = '10px';
  elem.style.display = 'flex';
  elem.style.flexDirection = 'column';
  elem.style.color = 'blue';
  elem.firstElementChild.style.textAlign = 'center';
  elem.firstElementChild.style.fontSize = '30px';
});

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  defaultDate: new Date(),
  onClose(selectedDates) {
    let date = new Date();
    if (selectedDates[0].getTime() - date.getTime() <= 0) {
      Report.failure('Failure!', 'Please choose a date in the future!', 'Okay');
    } else {
      refs.startBtn.removeAttribute('disabled', 'disabled');
      refs.startBtn.addEventListener('click', onRunTimer);
      function onRunTimer() {
        Notify.info("Let's go!!!");
        refs.startBtn.setAttribute('disabled', 'disabled');
        refs.input.setAttribute('disabled', 'disabled');

        const timerId = setInterval(() => {
          date = new Date();
          const dateDifference = selectedDates[0].getTime() - date.getTime();

          if (dateDifference <= 0) {
            clearInterval(timerId);
            refs.input.removeAttribute('disabled', 'disabled');
            Report.success('Success!', 'You have reached your goal!', 'Good)');
          } else {
            const timerIndication = convertMs(dateDifference);
            for (const key in timerIndication) {
              refs[key].textContent = String(timerIndication[key]).padStart(
                2,
                '0'
              );
            }
          }
        }, 1000);
      }
    }
  },
};




refs.input.addEventListener(
  'input',
  flatpickr(refs.input, options)
);

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return {days, hours, minutes, seconds};
    };
