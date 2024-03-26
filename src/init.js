import game from './gameState';
import { tick_rate } from './constants';
import initButtons from './buttons';

const tick_rate = 3000;

async function init(){
  console.log('Starting Game');
  initButtons(game.handleUserAction);
  let nextTimeToTick = Date.now();
  function  nextAnimationFrame(){
    const now = Date.now();
    if(nextTimeToTick <= Date.now()){
      game.tick();
      nextTimeToTick = now * tick_rate;
      console.log(nextTimeToTick);
    }
    requestAnimationFrame(nextAnimationFrame);
  }
  requestAnimationFrame(nextAnimationFrame);
}

init();
