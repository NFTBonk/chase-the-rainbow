const { System, Polygon, Circle } = require('detect-collisions');
const constants = require('../shared/constants');
const RainbowBit = require('./entities/rainbowBit');

/**
* Iterates through a set of entities within the player's radius.
* Upon collision, invokes the callback of the collided object.
* Returns a set of collided entities.
*/
function applyCollisions(player, localEntities, globalEntities) {
  if (!player.shouldCollide()) {
    return [undefined, []];
  }
  const collidedEntities = new Set();
  const system = new System();
  const line = new Polygon({ x: player.lastX, y: player.lastY }, [
    { x: 0, y: 0 },
    { x: player.x - player.lastX, y: player.y - player.lastY },
  ]);
  system.insert(line);

  localEntities.forEach((entity) => {
    if (entity.shouldCollide()) {
      let entityRadius = entity.radius;
      if (entity.type === constants.ENTITY_TYPE.RAINBOW_BIT
         || entity.type === constants.ENTITY_TYPE.FUEL_TANK || 
         entity.type === constants.ENTITY_TYPE.INVULNERABLE ||
         entity.type === constants.ENTITY_TYPE.MAGNET ||
         entity.type === constants.ENTITY_TYPE.X2 ||
         entity.type === constants.ENTITY_TYPE.SPEED_UP) entityRadius *= 2;
      const circle = new Circle({ x: entity.x, y: entity.y }, player.radius + entityRadius);
      circle.entity = entity;
      system.insert(circle);
    }
  });
  const drops = [];
  system.getPotentials(line).forEach((potential) => {
    if (system.checkCollision(line, potential)) {
      collidedEntities.add(potential.entity);
      const drop = potential.entity.onCollision(player, globalEntities);
      if (drop) {
        drop.forEach((pos) => {
          const bit = new RainbowBit();
          bit.x = pos.x;
          bit.y = pos.y;
          drops.push(bit);
        });
      }
    }
  });
  return [collidedEntities, drops];
}

function applyTrailCollisions(player, otherPlayers) {
  if (!player.shouldCollide()) {
    return;
  }

  const system = new System();
  const line = new Polygon({ x: player.lastX, y: player.lastY }, [
    { x: 0, y: 0 },
    { x: player.x - player.lastX, y: player.y - player.lastY },
  ]);
  system.insert(line);
  otherPlayers.forEach((otherPlayer) => {
    if (!otherPlayer.shouldCollide() || !otherPlayer.trail || otherPlayer == player) {
      return;
    }
    const trail = otherPlayer.trail.trailQueue;
    for (let i = 0; i < trail.length - 1; i++) {
      system.createPolygon({ x: trail[i].x, y: trail[i].y }, [
        { x: 0, y: 0 },
        { x: trail[i + 1].x - trail[i].x, y: trail[i + 1].y - trail[i].y },
      ]);
    }
  });
  const drops = [];
  system.getPotentials(line).forEach((potential) => {
    if (system.checkCollision(line, potential)) {
      const drop = player.die();

      if (drop) {
        drop.forEach((pos) => {
          const bit = new RainbowBit();
          bit.x = pos.x;
          bit.y = pos.y;
          drops.push(bit);
        });
      }
    }
  });
  return drops;
}

module.exports = { applyCollisions, applyTrailCollisions };
