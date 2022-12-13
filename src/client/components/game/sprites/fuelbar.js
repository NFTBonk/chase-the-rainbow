import Phaser from 'phaser';

const barWidth = 50;
const barHeight = 200;

export default class FuelBar extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y) {
        super(scene, x - barWidth * 0.5, y - barHeight);
        this.fuelContainer = scene.add.graphics({x: 0, y: 0});
        this.fuelFill = scene.add.graphics({x: 0, y: 0});
        let fuelOutline = scene.add.graphics({x: 0, y: 0});

        //CONTAINER
        this.fuelContainer.fillStyle(0xFFFFFF, 0.5);
        this.fuelContainer.fillRoundedRect(0,0, barWidth, barHeight, 15);
        this.fuelContainer.fillStyle(0xFFFFFF, 1);
        this.fuelContainer.fillRoundedRect(10, 10, barWidth - 20, barHeight - 20, 15);
        

        //INDICATOR
        this.fuelFill.fillStyle(0xFFA4D4, 1);
        this.fuelFill.fillRect(10, 10, barWidth - 20, barHeight - 20);

        //OUTLINE BORDER
        fuelOutline.lineStyle(2.5, 0x000000, 1);
        if(!this.scene.sys.game.device.os.android && !this.scene.sys.game.device.os.iOS) 
            fuelOutline.strokeRoundedRect(10, 10, barWidth - 20, barHeight - 20, 15);
        this.add(this.fuelContainer);
        this.add(this.fuelFill);
            this.add(fuelOutline);
        scene.add.existing(this);

        //USED FOR SMOOTHLY ANIMATING INDICATOR TO DESIRED VALUE
        this.currentPercentage = 1;

    }

    updateFuelDisplay(fuelPercentage, delta) {
        this.currentPercentage = this.currentPercentage + (fuelPercentage - this.currentPercentage) * delta;
        this.fuelFill.clear();
        this.fuelFill.fillStyle(0xFFA4D4, 1);
        this.fuelFill.fillRect(10, 10 + ((barHeight - 20) * (1 - this.currentPercentage)), barWidth - 20 , (barHeight - 20) * this.currentPercentage);
    }

    displayFuelEmpty() {
        this.fuelContainer.clear();
        this.fuelContainer.fillStyle(0xFF0000, 0.5);
        this.fuelContainer.fillRoundedRect(0,0, barWidth, barHeight, 15);
        this.fuelContainer.fillStyle(0xFFFFFF, 1);
        this.fuelContainer.fillRoundedRect(10, 10, barWidth - 20, barHeight - 20, 15);
    }

    resetFuelContainer() {
        this.fuelContainer.clear();
        this.fuelContainer.fillStyle(0xFFFFFF, 0.5);
        this.fuelContainer.fillRoundedRect(0,0, barWidth, barHeight, 15);
        this.fuelContainer.fillStyle(0xFFFFFF, 1);
        this.fuelContainer.fillRoundedRect(10, 10, barWidth - 20, barHeight - 20, 15);
    }

    setFillMask(mask) {
        this.fuelFill.setMask(mask);
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