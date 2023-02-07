import Phaser from 'phaser';

const MAX_DURATION = 15000;

export default class PowerupTimer extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y, powerupIcon) {
        super(scene, x, y);

        let sprite = scene.add.image(0,0, powerupIcon);
        sprite.setScale(0.75)
        this.add(sprite);

        this.arc = scene.add.graphics();
        this.arc.lineStyle(8, 0x00FF00, 1);
        this.arc.beginPath();
        this.arc.arc(0, 0, 56.25, Phaser.Math.DegToRad(630), Phaser.Math.DegToRad(270), true);
        this.arc.strokePath();
        this.add(this.arc);

        this.lastTimer = 0;

        scene.add.existing(this);

        this.powerupSFX = scene.sound.add('powerupPickup', { loop: false });


        this.visible = false;
    }

    updatePowerupTime(powerupTimer) {
        if(powerupTimer > this.lastTimer) {
            this.powerupSFX.play();
        }

        this.setVisible(powerupTimer > 0);
        this.arc.clear();
        this.arc.lineStyle(8, 0x00FF00, 1);
        this.arc.beginPath();
        this.arc.arc(0, 0, 56.25, Phaser.Math.DegToRad(630), Phaser.Math.DegToRad(270 + 360 * (1 - (powerupTimer / MAX_DURATION))), true);
        this.arc.strokePath();

        this.lastTimer = powerupTimer;

    }

    
}