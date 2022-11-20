import Phaser from 'phaser';
import loadship from '../../../../../public/assets/images/spaceloopyoyo.png';
class Prepreload extends Phaser.Scene {
  constructor() {
    super('prepreload');
  }

  preload() {
    let graphics = this.add.graphics();

    graphics.fillGradientStyle(0xCB7CFF, 0xCB7CFF, 0x8C7DEA, 0x8C7DEA, 1);
    graphics.fillRect(0, 0, 1920, 1080);
    
    this.add.text(this.scale.baseSize.width * 0.5, this.scale.baseSize.height * 0.5, 'Loading...', {fontFamily: 'Pangolin', fontSize: 64}).setOrigin(0.5);  

    this.load.spritesheet('loadship', loadship, { frameWidth: 300, frameHeight: 300, endFrame: 32 });
  }

  create() {
    this.scene.start('preload');
  }
}

export default Prepreload;
