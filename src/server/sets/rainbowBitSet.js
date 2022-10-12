const Distance = require('phaser/src/math/distance');
const EntitySet = require('./entitySet');

module.exports = class RainbowBitSet extends EntitySet {
  /** Returns rainbow bits within radius. */
  // eslint-disable-next-line no-unused-vars
  getAllEntitiesWithinRadius(_x, _y, _radius) {
    return new Set(Array.from(this).filter((entity) => {
      return Distance.Between(entity.x, entity.y, _x, _y) <= _radius;
    }));
  }
};
