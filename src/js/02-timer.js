// Імпортуємо потрібні бібліотеки
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Знаходимо елементи на сторінці.
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const alertSound = document.querySelector('#alertSound');

// Налаштування гучності звуку
alertSound.volume = 0.3;

// Знаходимо кнопку start на сторінці
const startBtn = document.querySelector('button[data-start]');

// Налаштування для вибору дати та часу
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate.getTime() < options.defaultDate.getTime()) {
      alertSound.play();
      Notiflix.Report.warning(
        "Упс ! Обрану дату з'їли динозаври...",
        'Будь ласка, оберіть дату з майбутнього',
        'Гаразд'
      );
      startBtn.classList.remove('valid-date');
      startBtn.classList.add('invalid-date');
    } else {
      startBtn.classList.remove('invalid-date');
      startBtn.classList.add('valid-date');
    }
  },
};

// Використовуємо flatpickr для вибору дати та часу
flatpickr('input#datetime-picker', options);

// Ініціалізуємо змінні для відстеження цільової дати та таймера
let targetDate = null;
let timer = null;
const interval = 1000;

// Додаємо слухача подій до кнопки start
startBtn.addEventListener('click', () => {
  if (targetDate && !timer) { 
      timer = setInterval(() => {
          let currentDateInMs = new Date().getTime();
          let timeDiff = targetDate.getTime() - currentDateInMs;
          if (timeDiff <= 0) {
              clearInterval(timer);
              timer = null; 
              
              let reloadIcon = document.querySelector('.reload-icon');
              if (reloadIcon) {
                  document.body.removeChild(reloadIcon);
              }

              return;
          }

          let remainingTime = convertMs(timeDiff);
          const timeUnits = {
              days: daysSpan,
              hours: hoursSpan,
              minutes: minutesSpan,
              seconds: secondsSpan,
          };
          
          // Оновлення відображення часу на сторінці
          Object.keys(timeUnits).forEach((unit) => {
              timeUnits[unit].textContent = String(remainingTime[unit]).padStart(2, '0');
          });
          
          // Перевірка чи іконка для перезавантаження вже існує
          if (!document.querySelector('.reload-icon')) {
            const reloadIcon = document.createElement('div');
            reloadIcon.classList.add('reload-icon'); 
            reloadIcon.innerHTML = "&#8635; reset";

              
            // Додаємо слухача подій до іконки перезавантаження
            reloadIcon.addEventListener('click', function() {
                location.reload();
            });
        
            const container = document.querySelector('.container'); 
            container.appendChild(reloadIcon); 
        }

        startBtn.style.display = 'none'
    

      }, interval);
  }
});

// Функція для перетворення мілісекунд в дні, години, хвилини, та секунди
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



















// // ------------------------ BUTTON  VISUAL --------------------------
const createSVG = (width, height, radius) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  const rectangle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'rect'
  );

  svg.setAttributeNS(
    'http://www.w3.org/2000/svg',
    'viewBox',
    `0 0 ${width} ${height}`
  );

  rectangle.setAttribute('x', '0');
  rectangle.setAttribute('y', '0');
  rectangle.setAttribute('width', '100%');
  rectangle.setAttribute('height', '100%');
  rectangle.setAttribute('rx', `${radius}`);
  rectangle.setAttribute('ry', `${radius}`);
  rectangle.setAttribute('pathLength', '10');

  svg.appendChild(rectangle);

  return svg;
};

document.querySelectorAll('.sketch-button').forEach(button => {
  const style = getComputedStyle(button);

  const lines = document.createElement('div');

  lines.classList.add('lines');

  const groupTop = document.createElement('div');
  const groupBottom = document.createElement('div');

  const svg = createSVG(
    button.offsetWidth,
    button.offsetHeight,
    parseInt(style.borderRadius, 10)
  );

  groupTop.appendChild(svg);
  groupTop.appendChild(svg.cloneNode(true));
  groupTop.appendChild(svg.cloneNode(true));
  groupTop.appendChild(svg.cloneNode(true));

  groupBottom.appendChild(svg.cloneNode(true));
  groupBottom.appendChild(svg.cloneNode(true));
  groupBottom.appendChild(svg.cloneNode(true));
  groupBottom.appendChild(svg.cloneNode(true));

  lines.appendChild(groupTop);
  lines.appendChild(groupBottom);

  button.appendChild(lines);

  button.addEventListener('pointerenter', () => {
    button.classList.add('start');
  });

  svg.addEventListener('animationend', () => {
    button.classList.remove('start');
  });
});