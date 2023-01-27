import Phaser from 'phaser';

const minimapSize = 200;
const offsetX = 300;
const offsetY = 220;
const visibilityRadius = 6000;

export default class Minimap extends Phaser.GameObjects.Graphics {
    
    constructor(scene, options) {
        super(scene, options);

        

        this.lineStyle(2.5, 0xffffff, 0.5);
        this.strokeRect(0,0, minimapSize, minimapSize);
        scene.add.existing(this);
    }

    updatePlayerPositions(playerposition) {
        this.clear();
        this.lineStyle(2.5, 0xffffff, 0.5);
        this.strokeRect(0,0, minimapSize, minimapSize);
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

        this.fillStyle(0xFFD700, 0.5)
        playerposition.powerups.forEach((powerup) => {
            if(!powerup.collectedBy) {
                this.fillRect(minimapSize * (powerup.x / 18000) - 2, minimapSize * (powerup.y / 18000) - 2, 4, 4)
            }
        });

        this.fillStyle(0xFFFFFF, 0.5)
        playerposition.pickups.forEach((pickup) => {
            this.fillRect(minimapSize * (pickup.x / 18000) - 2, minimapSize * (pickup.y / 18000) - 2, 4, 4)
        });
    }

}