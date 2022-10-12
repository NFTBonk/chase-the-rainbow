let entityIdCounter = 0

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
module.exports = class Entity {
  generateId() {
    return ++entityIdCounter;
  }

  update(time, dt) {
    // Abstract function.
  }

  getNetworkModel() {
    // Abstract function.
  }

  shouldCollide() {
    return true;
  }

  /**
   * Invoked upon collision with another entity.
   */
  onCollision(entity) {
    // Abstract function
  }

  /**
   * Computes distance to another entity.
   */
  distanceTo(entity) {
    const dx = this.x - entity.x;
    const dy = this.y - entity.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
};
