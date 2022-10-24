import Phaser from 'phaser';

const minimapSize = 200;
const offsetX = 300;
const offsetY = 220;

export default class Minimap extends Phaser.GameObjects.Graphics {
    
    constructor(scene, options) {
        options.x = options.x - offsetX;
        options.y = options.y - offsetY;
        super(scene, options);
        this.lineStyle(2.5, 0xffffff, 0.5);
        this.strokeRoundedRect(0,0, minimapSize, minimapSize, 10);
        scene.add.existing(this);

    }

    updatePlayerPositions(playerposition) {
        console.log(playerposition);
        this.clear();
        this.lineStyle(2.5, 0xffffff, 0.5);
        this.strokeRoundedRect(0,0, minimapSize, minimapSize, 10);
        this.fillStyle(0xFFFFFF, 0.5);
        this.fillCircle(minimapSize * (playerposition.x / 18000), minimapSize * (playerposition.y / 18000), 5);

    }

}