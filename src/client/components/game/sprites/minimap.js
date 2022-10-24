import Phaser from 'phaser';

const minimapSize = 200;
const offsetX = 300;
const offsetY = 220;

export default class Minimap extends Phaser.GameObjects.Graphics {
    
    constructor(scene, options) {
        options.x = options.x - offsetX;
        options.y = options.y - offsetY;
        super(scene, options);
        this.lineStyle(2.5, 0xffffff, 1);
        this.strokeRoundedRect(0,0, minimapSize, minimapSize,10);
        scene.add.existing(this);

    }

}