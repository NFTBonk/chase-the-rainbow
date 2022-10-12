/* eslint-disable class-methods-use-this */
const Constants = require('../../shared/constants');
const Entity = require('./entity');
const { v4: uuidv4 } = require('uuid');

/**
 * An object that increases a player's score and trail length when picked up.
 */
class DebugCircle extends Entity {
  constructor(x, y) {
    super();

    this.id = uuidv4();
    this.type = Constants.ENTITY_TYPE.DEBUG_CIRCLE;

    // Geometric attributes.
    this.x = x;
    this.y = y;
  }

  getNetworkModel() {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = DebugCircle;
