const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

let timerId = null

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartClick() {
    const repaint = () => refs.body.style.backgroundColor = getRandomHexColor()
    timerId = setInterval(repaint, 1000)
    refs.startBtn.disabled = true
}

function onStopClick() { 
    clearInterval(timerId)
    refs.startBtn.disabled = false
}

refs.startBtn.addEventListener('click', onStartClick)
refs.stopBtn.addEventListener('click', onStopClick)