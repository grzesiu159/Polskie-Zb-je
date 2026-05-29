export function createPlayer(playerClass) {
  return {
    name: "",

    className: playerClass.name,

    level: 1,
    xp: 0,
    xpNeeded: 100,

    money: 100,
    gold: 0,

    energy: 100,
    maxEnergy: 100,

    freePoints: 0,

    stats: {
      sila: playerClass.sila,
      inteligencja: playerClass.inteligencja,
      wytrzymalosc: playerClass.wytrzymalosc,
    },

    inventory: [1, 3],

    equipment: {
      head: null,
      weapon: null,
      armor: null,
      pants: null,
      shoes: null,
      ring: null,
      necklace: null,
    },

    defeatedEnemies: [],

    completedRegions: [],
    
    missions: [],

    reputation: {
      podhale: 0,
      slask: 0,
      pomorze: 0,
    },
  };
}