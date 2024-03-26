import { modFox, modScene, togglePoopBag } from "./ui";
import { rain_chance, scenes, day_length, night_length, getNextHungerTime, getNextDieTime } from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,

  tick(){
    this.clock++;
    console.log("Clock", this.clock);
    if(this.clock === this.wakeTime){
      this.wake();
    }else if(this.time === this.sleepTime){
      this.sleep();
    }else if(this.clock === this.hungryTime){
      this.getHungry();
    }else if(this.clock === this.dieTime){
      this.dieTime();
    }else if(this.clock === this.timeToStartCelebrating){
      this.startCelebrating();
    }else if(this.clock === this.timeToEndCelebrating){
      this.endCelebrating();
    }else if(this.clock === this.poopTime){
      this.poop();
    }
    return this.clock;
  },
  startGame(){
    console.log("Hatching");
    this.current = "Hatching";
    this.wakeTime = this.clock + 3;
    modFox('egg');
    modScene('day');
  },
  wake(){
    console.log("Awaken");
    this.current = "Idling";
    this.wakeTime = -1; 
    // modFox('idling');
    this.scene = Math.random() > rain_chance ? 0 : 1;  
    modScene(scenes[this.scenes]);
    this.sleepTime = this.clock + day_length;
    this.hungryTime = getNextHungerTime(this.clock)
    this.determineFoxState();
  },
  sleep(){
    this.state = "sleep";
    modFox("sleep");
    modFox('night');
    this.wakeTime = this.clock + night_length;
  },
  getHungry(){
    this.current = "Hungry";
    this.dieTime = getNextDieTime(this.clock); 
    this.hungryTime = -1;
    modFox("hungry");
  },
  poop(){
    this.current = 'Pooping',
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
  cleanUpPoop(){
    if(!this.current === "Pooping"){
      return;
    }
    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungerTime(this.clock); 
  },
  die(){
    console.log("Rip")
  },
  startCelebrating(){
    this.current = "Celebrating";
    modFox('celebrate');
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating(){
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },
  changeWeather(){
    this.scene = this.scene + 1 % scenes.length;
    modScene(scenes[this.scene]);
    this.determineFoxState();
  },
  determineFoxState(){
    if(this.current === "IDLING"){
      if(scenes[this.scene] === "rain"){
        modFox('rain');
      } else {
        modFox('idling');
      }
    }
  },
  handleUserAction(icon){
    if(['Sleep', 'Feeding', 'Celebrating', 'Hatching'].includes(this.current)){
      // do nothing
      return;
    }
    if(this.current === 'INIT' || this.current === "Dead"){
      this.startGame();
      return;
    }
  },
};

export default gameState;

