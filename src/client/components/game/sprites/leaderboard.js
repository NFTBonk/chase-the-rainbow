import Phaser from 'phaser';

const MARGIN_LEFT = 20;
const MARGIN_TOP = 10;
const LB_FONT_SIZE = '30px';

export default class Leaderboard extends Phaser.GameObjects.Container {
  constructor(scene, x , y) {
    super(scene, x, y);
    this.lbText = scene.add
      .text(0, 0, '', { fontFamily: '"Pangolin"', fontSize: LB_FONT_SIZE })
      .setDepth(100)
      .setOrigin(1, 0);
    this.lbText.setScrollFactor(0);
    this.add(this.lbText);
    scene.add.existing(this);
  }

  updateLeaderboard(lb) {
    this.lbText.setText(lb.map((e, i) => `${i + 1}. ${e.name} - ${e.score}`).slice(0,10).join('\n'));
  }

  destroy() {
    super.destroy();
  }
}
