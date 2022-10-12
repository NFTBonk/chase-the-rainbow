/* eslint-disable class-methods-use-this */
const Constants = require('../../shared/constants');
const Entity = require('./entity');

/**
 * An object that increases a player's score and trail length when picked up.
 */
class RainbowBit extends Entity {
  constructor() {
    super();

    this.id = this.generateId();
    this.type = Constants.ENTITY_TYPE.RAINBOW_BIT;
    this.collectedBy = false;

    // RainbowBit geometric attributes.
    this.x = Math.floor(Math.random() * (Constants.MAP_SIZE - 200) + 100);
    this.y = Math.floor(Math.random() * (Constants.MAP_SIZE - 200) + 100);
    this.radius = Constants.ITEM_RADIUS;
  }

  getNetworkModel() {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      collectedBy: this.collectedBy,
    };
  }

  onCollision(player, globalEntities) {
    if (!this.collectedBy) {
      this.collectedBy = player.id;
      player.addScore();
      setTimeout(() => {
        globalEntities.delete(this);
      }, 500);
    }
  }
}

module.exports = RainbowBit;
