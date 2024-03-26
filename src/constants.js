export const ICONS = ["fish",  "poop",  "weather"];
export const scenes = ['day', 'rain'];
export const tick_rate = 3000;
export const rain_chance = 0.2;
export const day_length = 30;
export const night_length = 5;

export const getNextHungerTime = clock => Math.floor(Math.random() * 3) + 8 + clock;
export const getNextDieTime = clock => Math.floor(Math.random() * 3) + 3 + clock;
export const getNextPoopTime = clock => Math.floor(Math.random() * 3) + 8 + clock;


