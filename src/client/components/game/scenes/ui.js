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
    this.createAudio();
    this.createScore();
    this.createFuel();
    this.createControlInfo();
    this.createMinimap();

    this.fuelBarValue = 1; // value in range [0, 1]
    this.previousScore = 0;
    this.previousFuel = 1; // full tank

    this.lb = new Leaderboard(this);

    eventCenter.on('playerScore', this.updateScore, this); // listen for score updates
    eventCenter.on('playerFuel', this.updateFuelBar, this); // listen for fuel updates
    eventCenter.on('spacebar', this.onUseGas, this); // listen for fuel updates
    eventCenter.on('lb', this.lb.updateLeaderboard, this.lb); // listen for leaderboard updates
    eventCenter.on('minimap', this.minimap.updatePlayerPositions, this.minimap); //listen for minimap updates
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
    let scoreGroup = this.add.container(0, 0);
    let scoreHeader = this.add.text(
      0, 0, SCORE_PREFIX, 
      {
        fontFamily: 'Pangolin',
        fontSize: SCORE_FONT_SIZE
      }
    ).setDepth(100);
    scoreGroup.add(scoreHeader);
    let scoreContainer = this.add.graphics({x: scoreHeader.width, y: - scoreHeader.height * 0.5 + 5});
    scoreContainer.fillStyle(0xFFFFFF, 0.5);
    scoreContainer.fillRoundedRect(0, 0, 180, 55, 10);
    scoreContainer.fillStyle(0xFFFFFF, 1);
    scoreContainer.fillRoundedRect(10,10, 160, 35, 10);
    scoreGroup.add(scoreContainer);
    this.score = this.add
      .text(scoreHeader.width + 160, 0, SCORE_INIT.toLocaleString(), {
        fontFamily: 'Pangolin', fontSize: SCORE_FONT_SIZE, color: '#000000', align: 'right'
      })
      .setDepth(100).setOrigin(1, 0);
    scoreGroup.add(this.score);
    this.scene.scene.plugins.get('rexanchorplugin').add(scoreGroup, {
      left: 'left+'+MARGIN_LEFT,
      top: 'top+'+MARGIN_TOP
    });
    this.score.setScrollFactor(0);
  }

  createFuel() {
    // const marginBottom = this.cameras.main.height - 45;
    let fuelContainer = this.add.container(0,0);
    this.fuel = this.add
      .text(0, 0, FUEL_PREFIX, {
        fontFamily: 'Pangolin', fontSize: SCORE_FONT_SIZE
      })
      .setDepth(100);
    this.fuel.setScrollFactor(0);
    this.newFuelBar = new FuelBar(this, this.fuel.width * 0.5, this.fuel.y - 10).setScrollFactor(0);
    fuelContainer.add(this.fuel);
    fuelContainer.add(this.newFuelBar);
    this.scene.scene.plugins.get('rexanchorplugin').add(fuelContainer, {
      left: 'left+'+MARGIN_LEFT,
      bottom: 'bottom-'+MARGIN_TOP
    });
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
    const marginBottom = this.cameras.main.height - 45;
    this.controlInfo = this.add
      .text(
        MARGIN_LEFT + this.fuel.width + this.fuel.x,
        marginBottom,
        CONTROL_INFO_PREFIX.concat(CONTROL_INFO_MUTE),
        {
          fontFamily: 'Pangolin', fontSize: SCORE_FONT_SIZE,
        },
      )
      .setDepth(100);
    this.controlInfo.setScrollFactor(0);
    // used to run when the resize has ended
    function debounce(func) {
      let timer;
      return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
      };
    }
    window.addEventListener('resize', debounce(() => {
      const marginBottom1 = this.cameras.main.height - 45;
      this.controlInfo.setY(marginBottom1);
    }));
  }

  createMinimap() {
    this.minimap = new Minimap(this, {x: this.cameras.main.width, y: this.cameras.main.height});
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

  update(time, delta) {
    this.newFuelBar.updateFuelDisplay(this.fuelBarValue, delta / 100);
  }
}

export default Ui;
