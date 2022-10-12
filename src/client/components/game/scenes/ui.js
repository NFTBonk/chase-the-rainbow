import Phaser from 'phaser';
import Leaderboard from '../sprites/leaderboard';
import eventCenter from './eventCenter';

const MARGIN_LEFT = 22;
const MARGIN_TOP = 76;
const FUEL_BAR_WIDTH = 400;
const FUEL_BAR_HEIGHT = 30;
const FUEL_BAR_BORDER_WIDTH = 2;
const SCORE_PREFIX = 'Score: ';
const FUEL_PREFIX = 'Fuel: ';
const SCORE_INIT = 0;
const SCORE_FONT_SIZE = '30px';
const CONTROL_INFO_PREFIX = '[SPACE] boost    [M] ';
const CONTROL_INFO_MUTE = 'mute sfx';
const CONTROL_INFO_UNMUTE = 'unmute sfx';
const OFF_WHITE = '0xF2F2F7';
const WHITE = '0xFFFFFF';
const DARK_PURPLE = '0x404096';
const MAGENTA = '0x924096';
const ALPHA_SEMI_OPAQUE = 0.85;
const IMAGE_DIMENSION = 16;
const IMAGE_SCALE_X = FUEL_BAR_WIDTH / IMAGE_DIMENSION;
const IMAGE_SCALE_Y = FUEL_BAR_HEIGHT / IMAGE_DIMENSION;

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

    // background meter
    this.fuelBarOuter = this.createFuelBar(
      MARGIN_LEFT + 75,
      MARGIN_TOP,
      FUEL_BAR_WIDTH + 2,
      FUEL_BAR_HEIGHT + 2,
      OFF_WHITE,
      ALPHA_SEMI_OPAQUE,
    );
    this.fuelBarOuter.lineStyle(FUEL_BAR_BORDER_WIDTH, WHITE, 1 /** alpha */);
    this.fuelBarOuter.strokeRectShape(
      new Phaser.Geom.Rectangle(0, 0, FUEL_BAR_WIDTH + 2, FUEL_BAR_HEIGHT + 2),
    );

    const imageCenterX = MARGIN_LEFT + 75 + (FUEL_BAR_WIDTH / 2) + (FUEL_BAR_BORDER_WIDTH / 2);
    this.fuelBarInner = this.add
      .image(imageCenterX, MARGIN_TOP + FUEL_BAR_HEIGHT / 2 + 1, 'pixel')
      .setScale(IMAGE_SCALE_X, IMAGE_SCALE_Y)
      .setTint(MAGENTA, DARK_PURPLE, MAGENTA, DARK_PURPLE)
      .setDepth(103)
      .setScrollFactor(0);

    this.fuelBarValue = 1; // value in range [0, 1]
    this.previousScore = 0;
    this.previousFuel = 1; // full tank

    this.lb = new Leaderboard(this);

    eventCenter.on('playerScore', this.updateScore, this); // listen for score updates
    eventCenter.on('playerFuel', this.updateFuelBar, this); // listen for fuel updates
    eventCenter.on('lb', this.lb.updateLeaderboard, this.lb); // listen for leaderboard updates
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
    this.score = this.add
      .text(MARGIN_LEFT, MARGIN_TOP - 45, SCORE_PREFIX.concat(SCORE_INIT), {
        fontFamily: '"Pangolin"', fontSize: SCORE_FONT_SIZE,
      })
      .setDepth(100);
    this.score.setScrollFactor(0);
  }

  createFuel() {
    this.fuel = this.add
      .text(MARGIN_LEFT, MARGIN_TOP, FUEL_PREFIX, {
        fontFamily: '"Pangolin"', fontSize: SCORE_FONT_SIZE,
      })
      .setDepth(100);
    this.fuel.setScrollFactor(0);
  }

  updateScore(currentScore) {
    // Compare new frame's score against previous frame's to determine if a rainbow bit was picked up. 
    if (!this.audioMuted && this.previousScore !== currentScore) {
      this.rainbowSfx.play();
    }
    this.score.setText(SCORE_PREFIX.concat(currentScore));
    this.previousScore = currentScore;
  }

  createControlInfo() {
    const marginBottom = this.cameras.main.height - 45;
    this.controlInfo = this.add
      .text(
        MARGIN_LEFT,
        marginBottom,
        CONTROL_INFO_PREFIX.concat(CONTROL_INFO_MUTE),
        {
          fontFamily: '"Pangolin"', fontSize: SCORE_FONT_SIZE,
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

  createFuelBar(x, y, width, height, color, alpha) {
    // draw the bar
    const bar = this.add.graphics();
    bar.setDepth(99);

    // color the bar
    bar.fillStyle(color, alpha);

    // fill the bar with a rectangle
    bar.fillRect(0, 0, width, height);

    // position the bar
    bar.x = x;
    bar.y = y;
    bar.setScrollFactor(0, 0);

    return bar;
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

  update(time, delta) {
    if (this.fuelBarInner.scaleX / IMAGE_SCALE_X < this.fuelBarValue) {
      this.fuelBarInner.scaleX = IMAGE_SCALE_X * this.fuelBarValue;
    } else if (this.fuelBarInner.scaleX / IMAGE_SCALE_X > this.fuelBarValue) {
      this.fuelBarInner.scaleX = IMAGE_SCALE_X * Math.max(
        this.fuelBarInner.scaleX / IMAGE_SCALE_X - delta / 4000, this.fuelBarValue,
      );
    }

    // Update center x in order to left-align as width changes
    const widthAfterScaling = IMAGE_DIMENSION * this.fuelBarInner.scaleX;
    this.fuelBarInner.x = MARGIN_LEFT + 75 + FUEL_BAR_BORDER_WIDTH / 2 + widthAfterScaling / 2;
  }
}

export default Ui;
