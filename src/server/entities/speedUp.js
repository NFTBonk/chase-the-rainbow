/* eslint-disable class-methods-use-this */
const Constants = require('../../shared/constants');
const Entity = require('./entity');

/**
 * An object that increases a player's gas values when picked up.
 */
class SpeedUp extends Entity {
  constructor() {
    super();

    this.id = this.generateId();
    this.type = Constants.ENTITY_TYPE.SPEED_UPs;
    this.collectedBy = false;

    // fuelTank geometric attributes.
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
    // if (!this.collectedBy) {
    //   player.addGas();
    //   this.collectedBy = player.id;
    //   setTimeout(() => {
    //     globalEntities.delete(this);
    //   }, 500);
    // }
  }
}

module.exports = SpeedUp;
