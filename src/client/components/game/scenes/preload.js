import Phaser from 'phaser';
import pixel from '../../../../../public/assets/images/16x16.png';
import killIcon from '../../../../../public/assets/images/killicon.png';
import rotate from '../../../../../public/assets/images/rotate.png';
import bg0Image from '../../../../../public/assets/images/bg/bg0.png';
import clouds from '../../../../../public/assets/images/bg/clouds.png';
import stars from '../../../../../public/assets/images/bg/stars.png';
import moon from '../../../../../public/assets/images/bg/moon.png';
import bubblePlanet from '../../../../../public/assets/images/bg/bubblePlanet.png';
import bluePlanet from '../../../../../public/assets/images/bg/bluePlanet.png';
import greenPlanet from '../../../../../public/assets/images/bg/greenPlanet.png';
import cookiePlanet from '../../../../../public/assets/images/bg/cookiePlanet.png';
import narutoPlanet from '../../../../../public/assets/images/bg/narutoPlanet.png';
import sushiPlanet from '../../../../../public/assets/images/bg/sushiPlanet.png';
import carrotPlanet from '../../../../../public/assets/images/bg/carrotPlanet.png';
import coffeeplanet from '../../../../../public/assets/images/bg/coffeeplanet.png';
import doodliftsplanet from '../../../../../public/assets/images/bg/doodliftsplanet.png';
import finnsplanet from '../../../../../public/assets/images/bg/finnsplanet.png';
import fundayplanet from '../../../../../public/assets/images/bg/fundayplanet.png';
import jkbplanet from '../../../../../public/assets/images/bg/jkbplanet.png';
import perfyplanet from '../../../../../public/assets/images/bg/perfyplanet.png';
import wizardplanet from '../../../../../public/assets/images/bg/wizardplanet.png';
import bananacandyplanet from '../../../../../public/assets/images/bg/bananacandyplanet.png';
import raeplanet from '../../../../../public/assets/images/bg/raeplanet.png';
import poopieplanet from '../../../../../public/assets/images/bg/poopieplanet.png';
import rainbowBitImage from '../../../../../public/assets/images/items/rainbow-bit.png';
import fuelTankImage from '../../../../../public/assets/images/items/fuel.png';
import invulImage from '../../../../../public/assets/images/items/invulnerable.png';
import speedUpImage from '../../../../../public/assets/images/items/speedup.png';
import doubleImage from '../../../../../public/assets/images/items/double.png';
import magnetImage from '../../../../../public/assets/images/items/magnet.png';
import radarImage from '../../../../../public/assets/images/items/radar.png';
import chestImage from '../../../../../public/assets/images/items/chest.png';
import invulIconImage from '../../../../../public/assets/images/items/invulnerable_icon.png';
import speedUpIconImage from '../../../../../public/assets/images/items/speed_up_icon.png';
import doubleIconImage from '../../../../../public/assets/images/items/double_icon.png';
import magnetIconImage from '../../../../../public/assets/images/items/magnet_icon.png';
import radarIconImage from '../../../../../public/assets/images/items/radar_icon.png';
import defaultShipImage from '../../../../../public/assets/images/ships/ship1/head.png';
import rainbowPickupAudio from '../../../../../public/assets/audio/rainbow_pickup.mp3';
import fuelPickupAudio from '../../../../../public/assets/audio/fuel_pickup.mp3';
import powerupAudio from '../../../../../public/assets/audio/powerup.mp3';
import defaultTrailImage from '../../../../../public/assets/images/ships/trail.png';
import magnetFX_1 from '../../../../../public/assets/images/ships/ship1/magnetfx_1.png';
import magnetFX_2 from '../../../../../public/assets/images/ships/ship1/magnetfx_2.png';
import magnetFX_3 from '../../../../../public/assets/images/ships/ship1/magnetfx_3.png';
import magnetFX_4 from '../../../../../public/assets/images/ships/ship1/magnetfx_4.png';

class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    
    var config = {
      key: 'loadingship',
      frames: this.anims.generateFrameNumbers('loadship', { start: 0, end: 32}),
      frameRate: 20,
      yoyo: true,
      repeat: -1
    };
    
    this.anims.create(config);

    let graphics = this.add.graphics();

    graphics.fillGradientStyle(0xCB7CFF, 0xCB7CFF, 0x8C7DEA, 0x8C7DEA, 1);
    graphics.fillRect(0, 0, 1920, 1080);
    
    let ship = this.add.sprite(this.scale.baseSize.width * 0.5, this.scale.baseSize.height * 0.4, 'loadship').play('loadingship');
    this.add.text(this.scale.baseSize.width * 0.5, this.scale.baseSize.height * 0.4 + ship.height, 'Loading...', {fontFamily: 'Pangolin', fontSize: 48}).setOrigin(0.5);  



    // Map and UI
    this.load.image('bg0', bg0Image);
    this.load.image('clouds', clouds);
    this.load.image('stars', stars);
    this.load.image('pixel', pixel);
    this.load.image('rotate', rotate);
    this.load.image('killIcon', killIcon);

    // Object
    this.load.image('rainbowBit', rainbowBitImage);
    this.load.image('fuelTank', fuelTankImage);
    this.load.image('speedUp', speedUpImage);
    this.load.image('invulnerable', invulImage);
    this.load.image('double', doubleImage);
    this.load.image('magnet', magnetImage);
    this.load.image('radar', radarImage);
    this.load.image('treasure', chestImage);
    this.load.image('speedup_icon', speedUpIconImage);
    this.load.image('invulnerable_icon', invulIconImage);
    this.load.image('double_icon', doubleIconImage);
    this.load.image('magnet_icon', magnetIconImage);
    this.load.image('radar_icon', radarIconImage);
    this.load.image('magnetFX_1', magnetFX_1);
    this.load.image('magnetFX_2', magnetFX_2);
    this.load.image('magnetFX_3', magnetFX_3);
    this.load.image('magnetFX_4', magnetFX_4);
    this.load.image('bluePlanet', bluePlanet);
    this.load.image('greenPlanet', greenPlanet);
    this.load.image('cookiePlanet', cookiePlanet);
    this.load.image('bubblePlanet', bubblePlanet);
    this.load.image('narutoPlanet', narutoPlanet);
    this.load.image('sushiPlanet', sushiPlanet);
    this.load.image('carrotPlanet', carrotPlanet);
    this.load.image('coffeeplanet', coffeeplanet);
    this.load.image('doodliftsplanet', doodliftsplanet);
    this.load.image('finnsplanet', finnsplanet);
    this.load.image('fundayplanet', fundayplanet);
    this.load.image('jkbplanet', jkbplanet);
    this.load.image('perfyplanet', perfyplanet);
    this.load.image('wizardplanet', wizardplanet);
    this.load.image('bananacandyplanet', bananacandyplanet);
    this.load.image('raeplanet', raeplanet);
    this.load.image('poopieplanet', poopieplanet);
    this.load.image('moon', moon);

    // Players
    this.load.image('defaultShip', defaultShipImage);
    this.load.image('defaultTrail', defaultTrailImage);

    // Audio
    this.load.audio('rainbowPickup', rainbowPickupAudio);
    this.load.audio('fuelPickup', fuelPickupAudio);
    this.load.audio('powerupPickup', powerupAudio);

    //Load virtual joystick
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

  }

  create() {
    this.scene.start('mainMap');
  }
}

export default Preload;
