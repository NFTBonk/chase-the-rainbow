/* eslint-disable class-methods-use-this */
const Constants = require('../../shared/constants');
const Entity = require('./entity');

/**
 * An object that makes a player vulnerable values when picked up.
 */
class Invulnerable extends Entity {
  constructor() {
    super();

    this.id = this.generateId();
    this.type = Constants.ENTITY_TYPE.INVULNERABLE;
    this.collectedBy = false;

    // invulnerable geometric attributes.
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
      player.activateInvul();
      this.collectedBy = player.id;
      setTimeout(() => {
        globalEntities.delete(this);
      }, 500);
    }
  }
}

module.exports = Invulnerable;
