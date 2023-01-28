import Phaser from 'phaser';
import PowerupTimer from './powerupTimer';

const ICON_WIDTH = 93.75;
const SPACING = 50;


export default class PowerupHUD extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y) {
        super(scene, x, y);
        this.powerUpArray = [];
        this.speedUp = new PowerupTimer(scene, 0, 0, "speedup_icon");
        this.magnet = new PowerupTimer(scene, 0, 0, "magnet_icon");
        this.invul = new PowerupTimer(scene, 0, 0, "invulnerable_icon");
        this.double = new PowerupTimer(scene, 0, 0, "double_icon");
        this.radar = new PowerupTimer(scene, 0, 0, "radar_icon");

        this.powerUpArray.push(this.speedUp);
        this.powerUpArray.push(this.magnet);
        this.powerUpArray.push(this.invul);
        this.powerUpArray.push(this.double);
        this.powerUpArray.push(this.radar);
        this.add(this.speedUp);
        this.add(this.magnet);
        this.add(this.invul);
        this.add(this.double);
        this.add(this.radar);
        scene.add.existing(this);
    }

    updatePowerupTimes(powerupTimer) {
        this.speedUp.updatePowerupTime(powerupTimer.speedUpTimer);
        this.magnet.updatePowerupTime(powerupTimer.magnetTimer);
        this.invul.updatePowerupTime(powerupTimer.invulTimer);
        this.double.updatePowerupTime(powerupTimer.doubleTimer);
        this.radar.updatePowerupTime(powerupTimer.radarTimer);

        let visibleArr = this.powerUpArray.filter((powerupTimer) => powerupTimer.lastTimer > 0);

        visibleArr.sort((a, b) => a.lastTimer - b.lastTimer);

        let offset = (ICON_WIDTH + SPACING) * (visibleArr.length - 1) / 2;

        visibleArr.forEach((timer, index) => {
            timer.setPosition(-offset + (ICON_WIDTH + SPACING) * index , 0);
        });

    }

    
}