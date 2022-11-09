import Phaser from 'phaser';
import pixel from '../../../../../public/assets/images/16x16.png';
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
import defaultShipImage from '../../../../../public/assets/images/ships/ship1/head.png';
import rainbowPickupAudio from '../../../../../public/assets/audio/rainbow_pickup.mp3';
import fuelPickupAudio from '../../../../../public/assets/audio/fuel_pickup.mp3';
import defaultTrailImage from '../../../../../public/assets/images/ships/trail.png';
class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.add.text(this.scale.baseSize.width * 0.5, this.scale.baseSize.height * 0.5, 'Loading...', {fontFamily: 'Pangolin', fontSize: 64}).setOrigin(0.5);  

    // Map and UI
    this.load.image('bg0', bg0Image);
    this.load.image('clouds', clouds);
    this.load.image('stars', stars);
    this.load.image('pixel', pixel);

    // Object
    this.load.image('rainbowBit', rainbowBitImage);
    this.load.image('fuelTank', fuelTankImage);
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

    //Load virtual joystick
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

    window.scrollTo(0, 0);
  }

  create() {
    this.scene.start('mainMap');
  }
}

export default Preload;
