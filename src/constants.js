export const tick_rate = 3000;
export const ICONS = ["fish",  "poop",  "weather"];
export const rain_chance = 0.2;
export const scenes = ['day', 'rain'];
export const day_length = 10;
export const night_length = 4;

export const getNextHungerTime = clock => Math.floor(Math.random() * 3) + 5 + clock;
export const getNextDieTime = clock => Math.floor(Math.random() * 2) + 3 + clock;
export const getNextPoopTime = clock => Math.floor(Math.random() * 2) + 4 + clock;


