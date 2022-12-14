module.exports = Object.freeze({
  MAP_SIZE: 18000,
  MAX_ITEMS: 1200,
  MAX_BOTS: 16,
  MAX_PLAYERS: 32,
  MAX_USERNAME_LENGTH: 15,
  PLAYER_STATE: {
    LOGGING_IN: 0,
    PLAYING: 1,
    DEAD: 2,
  },
  // used for mapping entities to sprite images
  ENTITY_TYPE: {
    PLAYER: 'player',
    RAINBOW_BIT: 'rainbowBit',
    FUEL_TANK: 'fuelTank',
    DEBUG_CIRCLE: 'debugCircle',
  },
  PLAYER_RADIUS: 35,
  ITEM_RADIUS: 25 /** rainbow bits and fuel tanks */,
  GAS_INIT: 500,
  GAS_MAX_DEFAULT: 500,
  GAS_ADD_INCREMENT: 100,
  GAS_MINUS_INCREMENT: -10,
  SCORE_ADD_INCREMENT: 10,
  SCORE_TO_TRAIL_LENGTH_RATIO: 1/40,

  //ENUM FOR SERVER TYPE
  SERVER_TYPE : {
    TOURNAMENT: "Tournament",
    NORMAL: "Normal"
  },
  //HOW LONG EACH TOURNAMENT LASTS IN MINUTES
  TOURNAMENT_DURATION: 15,
  //HOW LONG BEFORE NEXT TOURNAMENT IN MINUTES
  TOURNAMENT_COOLDOWN: 15,
});
