import Phaser from 'phaser';

const minimapSize = 200;
const offsetX = 300;
const offsetY = 220;
const visibilityRadius = 6000;

export default class Minimap extends Phaser.GameObjects.Graphics {
    
    constructor(scene, options) {
        options.x = options.x - offsetX;
        options.y = options.y - offsetY;
        super(scene, options);

        let shapeMask = scene.make.graphics();
        shapeMask.fillStyle(0xFFFFFF, 1);

        shapeMask.fillRect(options.x,options.y, minimapSize, minimapSize);
        let mask = shapeMask.createGeometryMask();

        this.lineStyle(2.5, 0xffffff, 0.5);
        this.strokeRoundedRect(0,0, minimapSize, minimapSize, 10);
        scene.add.existing(this);
        this.setMask(mask);

    }

    updatePlayerPositions(playerposition) {
        this.clear();
        this.lineStyle(2.5, 0xffffff, 0.5);
        this.strokeRoundedRect(0,0, minimapSize, minimapSize, 10);
        if(playerposition.visible) {
            this.fillStyle(0xFFFFFF, 0.5);
            this.fillCircle(minimapSize * (playerposition.x / 18000), minimapSize * (playerposition.y / 18000), 5);
            this.lineStyle(1, 0xffffff, 0.3);
            this.strokeCircle(minimapSize * (playerposition.x / 18000), minimapSize * (playerposition.y / 18000), minimapSize * visibilityRadius / 18000);
        }

        
        this.fillStyle(0xFF0000, 0.5);
        playerposition.playerMap.forEach((value, key) => {
            if(value.visible) {
                this.fillCircle(minimapSize * (value.x / 18000), minimapSize * (value.y / 18000), 5);
            }
        })
    }

}