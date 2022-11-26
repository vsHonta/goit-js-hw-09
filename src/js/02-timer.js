import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    // timer: document.querySelector('.timer'),
    // field: document.querySelector('.field'),
    // value: document.querySelector('.value'),
    // label: document.querySelector('.label')
}



refs.startBtn.disabled = true

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


let chosenTime = 0
let timerId = null


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
        console.log(selectedDates[0]);
        chosenTime = selectedDates[0].getTime()
        const currentTime = options.defaultDate.getTime()

        if (currentTime > chosenTime) {
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.startBtn.disabled = true
        } else {refs.startBtn.disabled = false}
  },
};

flatpickr("#datetime-picker", options);


function addLeadingZero (value) {
    return value.toString().padStart(2, '0'); 
}
    
const onClick = evt => {

    function start() {    
        const currentTime = new Date().getTime();
        const ms = chosenTime - currentTime;
        
        if(currentTime > chosenTime) {
            clearInterval(timerId)
            return
        }
        
        const timeDifference = convertMs(ms);

        refs.days.textContent = addLeadingZero(timeDifference.days);
        refs.hours.textContent = addLeadingZero(timeDifference.hours);
        refs.minutes.textContent = addLeadingZero(timeDifference.minutes);
        refs.seconds.textContent = addLeadingZero(timeDifference.seconds); 
    } 

    timerId = setInterval(start, 1000)
};



refs.startBtn.addEventListener('click', onClick)
