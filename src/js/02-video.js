import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const storageKey = 'videoplayer-current-time';
const key = localStorage.getItem(storageKey);

if (key) {
  player.setCurrentTime(JSON.parse(key));
}

player.on('timeupdate', throttle(data => {
  localStorage.setItem(storageKey, JSON.stringify(data.seconds));
},1000));

