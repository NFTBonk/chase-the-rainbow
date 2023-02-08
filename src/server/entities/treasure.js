/* eslint-disable class-methods-use-this */
const Constants = require('../../shared/constants');
const Entity = require('./entity');

/**
 * A treasure chest that explodes after getting hit n times
 */
class Treasure extends Entity {
  constructor() {
    super();

    this.id = this.generateId();
    this.type = Constants.ENTITY_TYPE.TREASURE;
    this.life = Constants.TREASURE_LIFE;
    this.isInvul = false;

    // RainbowBit geometric attributes.
    this.x = Math.floor(Math.random() * (Constants.MAP_SIZE - 200) + 100);
    this.y = Math.floor(Math.random() * (Constants.MAP_SIZE - 200) + 100);
    this.radius = Constants.ITEM_RADIUS * 4;
  }

  getNetworkModel() {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      collectedBy: this.collectedBy,
      life: this.life,
      isInvul : this.isInvul
    };
  }

  onCollision(player, globalEntities) {
    if (!this.isInvul) {
      this.isInvul = true;
      this.life -= 1;
      setTimeout(() => {
        this.isInvul = false;
      }, Constants.TREASURE_INVUL_TIME);
      if(this.life == 0) {

        let dropPositions = [];
        let numOfDrops = 200;
        let radius = 750;
        //RANDOMIZE RAINBOW BITS IN A 500 RADIUS
        while(numOfDrops) {
            let sign = Math.random() > 0.5 ? 1 : -1;
            let x = this.x + Math.random() * radius * sign;
            sign = Math.random() > 0.5 ? 1 : -1;
            let y = this.y + Math.random() * radius * sign;
            dropPositions.push({x: Math.min(Math.max(100, x), Constants.MAP_SIZE - 200), y: Math.min(Math.max(100, y), Constants.MAP_SIZE - 200)})
            numOfDrops--;
        }


        
        //RELOCATE CHEST
        this.x = Math.floor(Math.random() * (Constants.MAP_SIZE - 200) + 100);
        this.y = Math.floor(Math.random() * (Constants.MAP_SIZE - 200) + 100);
        this.life = Constants.TREASURE_LIFE;
        return dropPositions;
      }
    }
  }
}

module.exports = Treasure;
