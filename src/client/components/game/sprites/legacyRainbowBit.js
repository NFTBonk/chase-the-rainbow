import Phaser from 'phaser';

export default class RainbowBit extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, {
      name: 'rainbow-Bit',
      key: 'rainbowBit',
    });
  }
}
