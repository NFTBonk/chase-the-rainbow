import Phaser from 'phaser';

class Rotate extends Phaser.Scene {
  constructor() {
    super('rotate');
  }

  create() {
    this.add.graphics().fillStyle(0x000000, 1).fillRect(0, 0, this.scale.baseSize.width, this.scale.baseSize.height);
    this.add.text(this.scale.baseSize.width * 0.5, this.scale.baseSize.height * 0.5, 'Rotate screen\nto landscape mode\n to continue playing', {fontFamily: 'Pangolin', fontSize: 32, align: "center"}).setOrigin(0.5);  
  }
}

export default Rotate;
