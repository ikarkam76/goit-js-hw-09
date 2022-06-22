import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const timerBlock = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const timerFieldDays = document.querySelector('[data-days]');
const timerFieldHours = document.querySelector('[data-hours]');
const timerFieldMin = document.querySelector('[data-minutes]');
const timerFieldSec = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', 'disabled');
timerBlock.style.display = 'flex';
timerField.forEach(elem => {
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
    onClose(selectedDates) {
        startBtn.removeAttribute('disabled', 'disabled');
        startBtn.addEventListener('click', onRunTimer);
       
        function onRunTimer() {
            Notify.info("Let's go!!!");
            startBtn.setAttribute('disabled', 'disabled');
            const timerId = setInterval(() => {
                    const date = new Date();
                const dateDifference = selectedDates[0].getTime() - date.getTime();
                    if (dateDifference < -999) {
                        clearInterval(timerId);
                        Report.failure(
                          'Failure!',
                          'Please choose a date in the future',
                          'Okay'
                        );
                    } else {
                        if (dateDifference <= 0) {
                            clearInterval(timerId);
                            Report.success(
                              'Success!',
                              'You have reached your goal!',
                              'Good'
                            );
                        } else {
                            const timerIndication = convertMs(dateDifference);
                            timerFieldDays.textContent = String(timerIndication.days).padStart(2, '0');
                            timerFieldHours.textContent = String(timerIndication.hours).padStart(2, '0');
                            timerFieldMin.textContent = String(timerIndication.minutes).padStart(2, '0');
                            timerFieldSec.textContent = String(timerIndication.seconds).padStart(2, '0');
                        }
}
            }, 1000);
        
        }
        
    }
};



timeInput.addEventListener(
  'input',
  flatpickr(timeInput, options)
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

  return { days, hours, minutes, seconds };
}

