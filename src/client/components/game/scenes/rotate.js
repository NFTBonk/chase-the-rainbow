import Phaser from 'phaser';

class Rotate extends Phaser.Scene {
  constructor() {
    super('rotate');
  }

  create() {
    let graphics = this.add.graphics();

    graphics.fillGradientStyle(0xCB7CFF, 0xCB7CFF, 0x8C7DEA, 0x8C7DEA, 1);
    graphics.fillRect(0, 0, 1920, 1080);

    this.add.text(this.scale.baseSize.width * 0.5, this.scale.baseSize.height * 0.25, 'Rotate screen\nto landscape mode\n to continue playing', {fontFamily: 'Pangolin', fontSize: 32, align: "center"}).setOrigin(0.5);  
    this.add.image(this.scale.baseSize.width * 0.5, this.scale.baseSize.height * 0.5, 'rotate').setScale(0.8);
  }
}

export default Rotate;
