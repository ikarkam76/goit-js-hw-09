


const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerBlock = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');

timerBlock.style.display = 'flex';
timerField.forEach(elem => {
    elem.style.margin = '10px';
    elem.style.display = 'flex';
    elem.style.flexDirection = 'column';
    elem.style.color = 'blue';
    elem.firstElementChild.style.textAlign = 'center';
    elem.firstElementChild.style.fontSize = '30px';
});

