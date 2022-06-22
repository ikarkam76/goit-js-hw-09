const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onChangeBgc)

stopBtn.addEventListener('click', onStopChangeBgc);

function onChangeBgc() {
    timerId = setInterval(getRandomHexColor, 1000);
    startBtn.setAttribute('disabled', 'disabled');
}

function onStopChangeBgc() {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return (document.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`);
};