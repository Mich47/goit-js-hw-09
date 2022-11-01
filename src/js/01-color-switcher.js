const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let intervalID;

btnStop.disabled = true;
btnStart.style.cursor = 'pointer';
btnStop.style.cursor = 'pointer';

btnStart.addEventListener('click', () => {
  intervalID = setInterval(setBodyBGColor, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
});

btnStop.addEventListener('click', () => {
  clearInterval(intervalID);
  btnStart.disabled = false;
  btnStop.disabled = true;
});

function setBodyBGColor() {
  window.document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
