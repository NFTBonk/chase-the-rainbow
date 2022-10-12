const Distance = require('phaser/src/math/distance');

// TODO: Remove all "sets" and have common EntitySet handle everything.
module.exports = class EntitySet extends Set {
  broadcast(message, ...args) {
    this.forEach((entity) => {
      entity.send(message, ...args);
    });
  }

  // eslint-disable-next-line no-unused-vars
  getAllEntitiesWithinRadius(_x, _y, _radius) {
    return new Set(Array.from(this).filter((entity) => {
      return Distance.Between(entity.x, entity.y, _x, _y) <= _radius;
    }));
  }
};
