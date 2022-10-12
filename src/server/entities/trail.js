const Entity = require('./entity');

const TRAIL_REFRESH_MS = 100;

module.exports = class Trail extends Entity {
  constructor(player) {
    super();

    this.player = player;
    this.length = 0;
    this.trailQueue = [];

    this.nextPushCountdown = 0;
  }

  pushPosition(x, y) {
    this.trailQueue.push({ x, y });
    this.pruneExtra();
  }

  pruneExtra() {
    while (this.trailQueue.length > this.length) {
      this.trailQueue.shift();
    }
  }

  setLength(length) {
    this.length = length;
    // If length is less than before, cuts out the extra trail.
    this.pruneExtra();
  }

  resetPosition(x, y) {
    for (let trail of this.trailQueue) {
      trail.x = x;
      trail.y = y;
    }
  }

  update(time, dt) {
    this.nextPushCountdown -= dt;
    if (this.nextPushCountdown <= 0) {
      this.pushPosition(this.player.x, this.player.y);
      this.nextPushCountdown = TRAIL_REFRESH_MS;
    }
    // Abstract function.
  }

  getNetworkModel() {
    return Array.from(this.trailQueue);
  }
};
