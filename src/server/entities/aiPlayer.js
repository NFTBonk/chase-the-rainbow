const Angle = require('phaser/src/math/angle');
const Distance = require('phaser/src/math/distance');
const Player = require('./player');
const Constants = require('../../shared/constants');

module.exports = class AiPlayer extends Player {
  constructor(id, socket) {
    super(id, socket);
    this.id = this.generateId();
    this.ai = true;
    this.nearestEntity = null;
    this.chaseTime = 0;
  }

  update(time, dt) {
    if (this.nearestEntity) {
      this.inputAngle = Math.atan2(this.nearestEntity.y - this.y, this.nearestEntity.x - this.x);
    }
    super.update(time, dt);
  }

  tick(entities) {
    const nearestEntities = entities.sort((a, b) => {
      const ha = Distance.Between(this.x, this.y, a.x, a.y);
      const hb = Distance.Between(this.x, this.y, b.x, b.y);
      return ha - hb;
    });

    if (nearestEntities.length == 0) {
      return;
    }

    const oldNearest = this.nearestEntity ? this.nearestEntity.id : null;
    [this.nearestEntity] = nearestEntities;
    if (this.nearestEntity.id !== oldNearest) {
      this.chaseTime = 0;
    } else {
      this.chaseTime += 1;
    }

    if(this.chaseTime > 10) {
      this.chaseTime = 0;
      // Now what actually happens is, it picks a random direction, then actually comes back to the nearest entity on a subsequent call. 
      this.nearestEntity = nearestEntities[Math.floor(Math.random() * nearestEntities.length)];
    }
  }

  die(killer) {
    function lerp(v0, v1, t) {
      return v0 * (1 - t) + v1 * t;
    }

    if(this.invulTime > 0) {
      return;
    }

    if(this.onDeath != null) {
      this.onDeath({dead: this.name, killer: killer});
    }
    const bitsToDrop = Math.min(this.score / 10, 200);
    const bitsBetweenTrail = Math.min(Math.max(1, Math.floor(bitsToDrop / this.trail.trailQueue.length)), 100);
 //   console.log(bitsToDrop, bitsBetweenTrail);
    const dropPositions = [];
    this.trail.trailQueue.forEach((pos, index) => {
      if (index === this.trail.trailQueue.length - 1) return;
      for (let i = 0; i < bitsBetweenTrail; i++) {
        dropPositions.push({
          x: lerp(pos.x, this.trail.trailQueue[index + 1].x, i / bitsBetweenTrail),
          y: lerp(pos.y, this.trail.trailQueue[index + 1].y, i / bitsBetweenTrail),
        });
      }
    });
    this.trail.setLength(0);

    this.x = Math.floor(Math.random() * (Constants.MAP_SIZE - 400) + 200);
    this.y = Math.floor(Math.random() * (Constants.MAP_SIZE - 400) + 200);
    this.lastX = this.x;
    this.lastY = this.y;
    this.angle = 0;
    this.trail.resetPosition(this.x, this.y);
    this.score = 0;
    this.kills = 0;
    this.level = 0;
    this.expRequired = 0;
    this.previousExpRequired = 0;
    return dropPositions;
  }
};
