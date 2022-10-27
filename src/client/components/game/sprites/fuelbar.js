import Phaser from 'phaser';

const barWidth = 50;
const barHeight = 200;

export default class FuelBar extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y) {
        super(scene, x, y);
        // this.lineStyle(2.5, 0xffffff, 0.5);
        this.fuelContainer = scene.add.graphics({x: 0, y: 0});
        this.fuelFill = scene.add.graphics({x: 0, y: 0});
        let fuelOutline = scene.add.graphics({x: 0, y: 0});

        this.fuelContainer.fillStyle(0xFFFFFF, 0.5);
        this.fuelContainer.fillRoundedRect(0,0, barWidth, barHeight, 15);
        this.fuelContainer.fillStyle(0xFFFFFF, 1);
        this.fuelContainer.fillRoundedRect(10, 10, barWidth - 20, barHeight - 20, 15);
        
        this.fuelFill.fillStyle(0xFFA4D4, 1);
        this.fuelFill.fillRect(10, 10, barWidth - 20, barHeight - 20);

        let shapeMask = scene.make.graphics();
        shapeMask.fillStyle(0xFFFFFF, 1);

        shapeMask.fillRoundedRect(10, 10, barWidth - 20, barHeight - 20, 15);
        let mask = shapeMask.createGeometryMask();
        this.fuelFill.setMask(mask);

        fuelOutline.lineStyle(2.5, 0x000000, 1);
        fuelOutline.strokeRoundedRect(10, 10, barWidth - 20, barHeight - 20, 15);
        this.add(this.fuelContainer);
        this.add(this.fuelFill);
        this.add(fuelOutline);
        scene.add.existing(this);

        this.currentPercentage = 1;
    }

    updateFuelDisplay(fuelPercentage, delta) {
        this.currentPercentage = this.currentPercentage + (fuelPercentage - this.currentPercentage) * delta;
        this.fuelFill.clear();
        this.fuelFill.fillStyle(0xFFA4D4, 1);
        this.fuelFill.fillRect(10, 10 + ((barHeight - 20) * (1 - this.currentPercentage)), barWidth - 20 , (barHeight - 20) * this.currentPercentage);
    }

    // updatePlayerPositions(playerposition) {
    //     this.clear();
    //     this.lineStyle(2.5, 0xffffff, 0.5);
    //     this.strokeRoundedRect(0,0, minimapSize, minimapSize, 10);
    //     this.fillStyle(0xFFFFFF, 0.5);
    //     this.fillCircle(minimapSize * (playerposition.x / 18000), minimapSize * (playerposition.y / 18000), 5);
    //     this.lineStyle(1, 0xffffff, 0.3);
    //     this.strokeCircle(minimapSize * (playerposition.x / 18000), minimapSize * (playerposition.y / 18000), minimapSize * visibilityRadius / 18000);

        
    //     this.fillStyle(0xFF0000, 0.5);
    //     playerposition.playerMap.forEach((value, key) => {
    //         this.fillCircle(minimapSize * (value.x / 18000), minimapSize * (value.y / 18000), 5);
    //     })
    // }

}