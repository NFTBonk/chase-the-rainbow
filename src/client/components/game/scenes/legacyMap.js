import Phaser from 'phaser';
import RainbowBit from '../sprites/legacyRainbowBit';
import FuelTank from '../sprites/fuelTank';
import Constants from '../../shared/constants';

const SCORE_INCREASE_AMOUNT = 10;
const FUEL_INCREASE_AMOUNT = 10;

class Map1 extends Phaser.Scene {
  constructor() {
    super('map1');

    this.config = {
      tile: 'bg0',
      width: Constants.MAP_SIZE,
      height: Constants.MAP_SIZE,
      rainbowBits: 150,
      fuelTanks: 120,
      bots: 10,
    };

    this.bots = [];
    this.ranks = [];
    this.skins = [];
  }

  create() {
    this.rainbowBits = this.add.group();
    this.fuelTanks = this.add.group();
    this.ships = this.add.group();
    this.trails = this.add.group();

    this.physics.world.setBounds(0, 0, this.config.width, this.config.height);

    this.createGround();
    this.createItems();
    this.createPlayer();
    this.createBots();
    this.handleCollision();
    this.scene.run('ui');
  }

  createGround() {
    this.bg = this
      .add.tileSprite(0, 0, this.config.width, this.config.height, this.config.tile)
      .setOrigin(0);
  }

  createPlayer() {
    this.player = new Ship(this, {
      key: 'default',
      isActivePlayer: true,
    });
  }

  createItems() {
    for (let i = 0; i < this.config.rainbowBits; i++) {
      new RainbowBit(this);
    }
    for (let i = 0; i < this.config.fuelTanks; i++) {
      new FuelTank(this);
    }
  }

  createBots() {
    for (let i = 0; i < this.config.bots; i++) {
      this.addBot();
    }
  }

  addBot() {
    this.bots.push(new Ship(this, {
      key: 'default',
      isActivePlayer: false,
    }));
  }

  handleCollision() {
    this.physics.add.overlap(this.ships, this.rainbowBits, (ship, rainbowBit) => {
      rainbowBit.class.destroy(ship);
      ship.class.updateScore(SCORE_INCREASE_AMOUNT);
      ship.class.updateTrail();
    });

    this.physics.add.overlap(this.ships, this.fuelTanks, (ship, fuelTank) => {
      fuelTank.class.destroy(ship);
      ship.class.updateFuelMeter(FUEL_INCREASE_AMOUNT);
    });

    this.physics.add.overlap(this.ships, this.trails, (ship, trail) => {
      if (ship.id !== trail.id) {
        ship.class.die();
      }
    });
  }

  update() {
    this.player.update();
    this.bots.forEach((bot) => bot.update());
  }
}

export default Map1;
