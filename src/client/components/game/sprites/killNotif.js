import Phaser from 'phaser';

const MARGIN_LEFT = 20;
const MARGIN_TOP = 10;
const LB_FONT_SIZE = '30px';

export default class KillNotif extends Phaser.GameObjects.Container {
  constructor(scene, x , y) {
    super(scene, x, y);
    this.killQueue = [];

    this.killText = scene.add
    .text(0, 0, '', { fontFamily: '"Pangolin"', fontSize: LB_FONT_SIZE,  })
    .setDepth(100)
    .setOrigin(0.5, 0.5)
    .setAlpha(0);
    
    this.animationTL = scene.tweens.createTimeline();
    this.animationTL.add({
      targets: this.killText,
      duration: 500,
      alpha: 1,
    });
    this.animationTL.add({
      targets: this.killText,
      duration: 500,
      alpha: 0,
      offset: "+=2000"
    });

    this.animationTL.onComplete = showQueue.bind(this);

    this.add(this.killText);
    scene.add.existing(this);
  }

  addToQueue(killData) {
    killData.array.forEach(element => {
      let index = this.killQueue.findIndex(e => e == element);
      if(index != -1) {
        this.killQueue.push(element);
      }
    });
    
    this.showQueue();
  }

  showQueue() {
    if(killData.length > 0 && !this.animationTL.isPlaying()) {
      let killInfo = this.killQueue.shift();
      this.killText.setText(killInfo.killer + " has pwned " + killInfo.dead + "'s ship");

      this.animationTL.play();
    } else {
      this.killText.setAlpha(0);
      this.animationTL.pause();
      this.animationTL.resetTweens();
      return;
    }
  }



  destroy() {
    super.destroy();
  }
}
