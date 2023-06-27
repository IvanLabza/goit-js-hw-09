import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveCurrentTime, 500));

function saveCurrentTime() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(STORAGE_KEY, seconds);
  });
}

const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(savedTime);
}
