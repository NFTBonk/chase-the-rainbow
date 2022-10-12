import Phaser from 'phaser';

const MARGIN_LEFT = 20;
const MARGIN_TOP = 10;
const LB_FONT_SIZE = '30px';

export default class Leaderboard extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 'leaderboard');
    const { width } = scene.sys.game.canvas;
    this.lbText = scene.add
      .text(width - MARGIN_LEFT, MARGIN_TOP, '', { fontFamily: '"Pangolin"', fontSize: LB_FONT_SIZE })
      .setDepth(100)
      .setOrigin(1, 0);
    this.lbText.setScrollFactor(0);

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.lbText.x = scene.sys.game.canvas.width - MARGIN_LEFT;
      }, 200);
    });
  }

  updateLeaderboard(lb) {
    this.lbText.setText(lb.map((e, i) => `${i + 1}. ${e.name} - ${e.score}`).slice(0,10).join('\n'));
  }

  destroy() {
    super.destroy();
  }
}
