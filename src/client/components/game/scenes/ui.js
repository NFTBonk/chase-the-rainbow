import Phaser from 'phaser';
import FuelBar from '../sprites/fuelbar';
import Leaderboard from '../sprites/leaderboard';
import Minimap from '../sprites/minimap';
import eventCenter from './eventCenter';

const MARGIN_LEFT = 22;
const MARGIN_TOP = 31;
const SCORE_PREFIX = 'Score: ';
const FUEL_PREFIX = 'Fuel';
const SCORE_INIT = 0;
const SCORE_FONT_SIZE = '30px';
const CONTROL_INFO_PREFIX = '[SPACE] boost    [M] ';
const CONTROL_INFO_MUTE = 'mute sfx';
const CONTROL_INFO_UNMUTE = 'unmute sfx';

class Ui extends Phaser.Scene {
  constructor() {
    super('ui');
    Phaser.Scene.call(this, { key: 'ui' });
  }

  create() {
    this.cullFactorHeight = (this.scale.displaySize.height - this.scale.displaySize._parent.height ) / this.scale.displaySize.height;
    this.cullFactorWidth = (this.scale.displaySize.width - this.scale.displaySize._parent.width ) / this.scale.displaySize.width;
    this.createAudio();
    this.createScore();
    this.createFuel();
    this.createControlInfo();
    this.createMinimap();
    this.createJoystick();
    this.createBoostButton();

    this.fuelBarValue = 1; // value in range [0, 1]
    this.previousScore = 0;
    this.previousFuel = 1; // full tank

    this.lb = new Leaderboard(this, this.scale.baseSize.width * (1 - this.cullFactorWidth / 2) - MARGIN_LEFT, this.scale.baseSize.height * (this.cullFactorHeight / 2) + MARGIN_TOP);

    eventCenter.on('playerScore', this.updateScore, this); // listen for score updates
    eventCenter.on('playerFuel', this.updateFuelBar, this); // listen for fuel updates
    eventCenter.on('spacebar', this.onUseGas, this); // listen for fuel updates
    eventCenter.on('lb', this.lb.updateLeaderboard, this.lb); // listen for leaderboard updates
    eventCenter.on('minimap', this.minimap.updatePlayerPositions, this.minimap); //listen for minimap updates

    this.scale.on('resize', (gameSize, baseSize, displaySize, previousWidth, previousHeight) => {
      let cullFactorHeight = (displaySize.height - displaySize._parent.height ) / displaySize.height;
      let cullFactorWidth = (displaySize.width - displaySize._parent.width ) / displaySize.width;

      this.minimap.setPosition(baseSize.width * (1 - cullFactorWidth / 2)  - 300, baseSize.height * (1 - cullFactorHeight / 2) - 220);
      this.minimapMask.setPosition(baseSize.width * (1 - cullFactorWidth / 2)  - 300, baseSize.height * (1 - cullFactorHeight / 2) - 220);
      this.scoreGroup.setPosition(baseSize.width * (cullFactorWidth / 2) + MARGIN_LEFT, baseSize.height * (cullFactorHeight / 2) + MARGIN_TOP);
      this.fuelContainer.setPosition(baseSize.width * (cullFactorWidth / 2) + MARGIN_LEFT, baseSize.height * (1 - cullFactorHeight / 2) - MARGIN_TOP - 20);
      this.fillMask.setPosition(this.fuelContainer.x + this.fuel.width * 0.5 - 15, this.fuelContainer.y + this.fuel.y - 200);
      this.controlInfo.setPosition(MARGIN_LEFT + this.fuel.width + this.fuelContainer.x, this.fuelContainer.y);
      this.lb.setPosition(baseSize.width * (1 - cullFactorWidth / 2) - MARGIN_LEFT, baseSize.height * (cullFactorHeight / 2) + MARGIN_TOP);
      this.joyStick.setPosition(baseSize.width * cullFactorWidth / 2 + 275, baseSize.height * (1 - cullFactorHeight / 2) - MARGIN_TOP -  200,)
    });
  }

  /** Adds callback to keypress on M and initializes audio as unmuted. */
  createAudio() {
    this.input.keyboard.on('keydown-M', this.toggleAudio, this);
    this.sound.pauseOnBlur = false;

    this.rainbowSfx = this.sound.add('rainbowPickup', { loop: false });
    this.fuelSfx = this.sound.add('fuelPickup', { loop: false });
    this.audioMuted = false;
  }

  toggleAudio(event) {
    if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.M) {
      if (!this.audioMuted) {
        this.audioMuted = true;
        this.controlInfo.setText(
          CONTROL_INFO_PREFIX.concat(CONTROL_INFO_UNMUTE),
        );
      } else {
        this.audioMuted = false;
        this.controlInfo.setText(CONTROL_INFO_PREFIX.concat(CONTROL_INFO_MUTE));
      }
    }
  }

  createScore() {
    this.scoreGroup = this.add.container(this.scale.baseSize.width * (this.cullFactorWidth / 2) + MARGIN_LEFT, this.scale.baseSize.height * (this.cullFactorHeight / 2) + MARGIN_TOP);
    let scoreHeader = this.add.text(
      0, 0, SCORE_PREFIX, 
      {
        fontFamily: 'Pangolin',
        fontSize: SCORE_FONT_SIZE
      }
    ).setDepth(100);
    this.scoreGroup.add(scoreHeader);
    let scoreContainer = this.add.graphics({x: scoreHeader.width, y: - scoreHeader.height * 0.5 + 5});
    scoreContainer.fillStyle(0xFFFFFF, 0.5);
    scoreContainer.fillRoundedRect(0, 0, 180, 55, 10);
    scoreContainer.fillStyle(0xFFFFFF, 1);
    scoreContainer.fillRoundedRect(10,10, 160, 35, 10);
    this.scoreGroup.add(scoreContainer);
    this.score = this.add
      .text(scoreHeader.width + 160, 0, SCORE_INIT.toLocaleString(), {
        fontFamily: 'Pangolin', fontSize: SCORE_FONT_SIZE, color: '#000000', align: 'right'
      })
      .setDepth(100).setOrigin(1, 0);
    this.scoreGroup.add(this.score);
    this.score.setScrollFactor(0);
  }

  createFuel() {
    this.fuelContainer = this.add.container(this.scale.baseSize.width * (this.cullFactorWidth / 2) + MARGIN_LEFT, this.scale.baseSize.height * (1 - this.cullFactorHeight / 2) - MARGIN_TOP- 20);
    this.fuel = this.add
      .text(0, 0, FUEL_PREFIX, {
        fontFamily: 'Pangolin', fontSize: SCORE_FONT_SIZE
      })
      .setDepth(100);
    this.fuel.setScrollFactor(0);
    this.newFuelBar = new FuelBar(this, this.fuel.width * 0.5, this.fuel.y - 10).setScrollFactor(0);
    this.fuelContainer.add(this.fuel);
    this.fuelContainer.add(this.newFuelBar);

    this.fillMask = this.make.graphics({x: this.fuelContainer.x + this.fuel.width * 0.5 - 15, y: this.fuelContainer.y + this.fuel.y - 200});
    this.fillMask.fillStyle(0xFFFFFF, 1);

    this.fillMask.fillRoundedRect(0, 0, 30, 180, 15);
    let mask = this.fillMask.createGeometryMask();
    this.newFuelBar.setFillMask(mask);
  }

  updateScore(currentScore) {
    // Compare new frame's score against previous frame's to determine if a rainbow bit was picked up. 
    if (!this.audioMuted && this.previousScore !== currentScore) {
      this.rainbowSfx.play();
    }
    this.score.setText(currentScore.toLocaleString());
    this.previousScore = currentScore;
  }

  createControlInfo() {
    this.controlInfo = this.add
      .text(
        MARGIN_LEFT + this.fuel.width + this.fuelContainer.x,
        this.fuelContainer.y,
        CONTROL_INFO_PREFIX.concat(CONTROL_INFO_MUTE),
        {
          fontFamily: 'Pangolin', fontSize: SCORE_FONT_SIZE,
        },
      )
      .setDepth(100);
    this.controlInfo.setScrollFactor(0);
  }

  createMinimap() {
    this.minimap = new Minimap(this, {x: this.scale.baseSize.width * (1 - this.cullFactorWidth / 2)  - 300, y: this.scale.baseSize.height * (1 - this.cullFactorHeight / 2) - 220});
    // minimapContainer.add(this.minimap);

    //MASK MINIMAP
    this.minimapMask = this.make.graphics({x: this.scale.baseSize.width * (1 - this.cullFactorWidth / 2)  - 300, y: this.scale.baseSize.height * (1 - this.cullFactorHeight / 2) - 220});
    this.minimapMask.fillStyle(0xFFFFFF, 1);
    this.minimapMask.fillRect(0,0, 200, 200);
    let mask = this.minimapMask.createGeometryMask();
    this.minimap.setMask(mask);

  }
  /** Restricts fuel bar value to [0, 1]. */
  updateFuelBar(currentFuel) {
    // Only play sfx when fuel level increases, i.e. fuel has been picked up
    // and gauge is not full
    if (!this.audioMuted && currentFuel > this.previousFuel) {
      this.fuelSfx.play();
    }
    const currentFuelLessThanOrEqualTo1 = Math.min(currentFuel, 1);
    this.fuelBarValue = Math.max(0, currentFuelLessThanOrEqualTo1);
    this.previousFuel = currentFuel;
  }

  onUseGas(isSpaceDown) {
    if(this.fuelBarValue == 0 && isSpaceDown) {
      this.newFuelBar.displayFuelEmpty();
    }

    if(!isSpaceDown) {
      this.newFuelBar.resetFuelContainer();
    }
  }

  createJoystick() {
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(
      this,  
      {
        x: this.scale.baseSize.width * this.cullFactorWidth / 2 + 275,
        y: this.scale.baseSize.height * (1 - this.cullFactorHeight / 2) - MARGIN_TOP -  200,
        radius: 125,
        base: this.add.circle(0, 0, 125, 0xFFFFFF, 0.25),
        thumb: this.add.circle(0, 0, 50, 0xFFFFFF),
      }
    )
    this.joyStick.on('update', () => {
      if(this.joyStick.force != 0)
        eventCenter.emit("joystickmove", this.joyStick.rotation)
    });
  }

  createBoostButton() {
    this.boostButton = this.add.graphics();
    this.boostButton.setInteractive(new Phaser.Geom.Rectangle(this.scale.baseSize.width * 0.5, 0, this.scale.baseSize.width * 0.5, this.scale.baseSize.height), Phaser.Geom.Rectangle.Contains);
    this.boostButton.on('pointerdown', () => {
      console.log("BOOST!");
      eventCenter.emit("boostButton", true)
    });
    this.boostButton.on('pointerup', () => eventCenter.emit("boostButton", false));
  }

  update(time, delta) {
    this.newFuelBar.updateFuelDisplay(this.fuelBarValue, delta / 100);
  }
}

export default Ui;
