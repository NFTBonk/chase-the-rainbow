import Phaser from 'phaser';
import Constants from '../../../../shared/constants';
import eventCenter from '../scenes/eventCenter';

const FRAME_HISTORY_MAX = 10;
// How many ms will we travel back in time to tween?
const TIME_TRAVEL_MS = 300;

export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, isLocalPlayer, nft) {
    super(scene, 'player');

    this.trailPoints = [];
    this.frameHistory = [];
    this.playerAngle = 0;
    this.nft = nft;

    this.realScaleX = 1;

    // Used to make the trail "follow" the player ship.
    this.lastTrailReset = 0;
    this.lastTrail = new Phaser.Math.Vector2(0, 0);

    // TODO: Load the nfts
    this.shipSprite = this.scene.add.sprite(0, 0, 'defaultShip');

    this.add(this.shipSprite);
    this.trailMesh = this.scene.add.graphics().setDepth(6);

    this.isLocalPlayer = isLocalPlayer;
    this.score = 0;
    this.nameTag = this.scene.add.text(0, 0, '', { fontFamily: '"Pangolin"', fontSize: '40px' }).setDepth(100);

    if (this.nft !== 'default' && this.nft) {
      const loader = new Phaser.Loader.LoaderPlugin(this.scene);
      // ask the LoaderPlugin to load the texture
      if (this.nft[0].trim() === 'Space Doodle') {
        loader.image(`nft${nft.join()}`, `https://space-noodles.s3.us-west-1.amazonaws.com/doodleShips/${nft[1]}.png`);
      } else {
        loader.image(`nft${nft.join()}`, `https://space-noodles.s3.us-west-1.amazonaws.com/nftships/noodle_ship_${nft[1]}.png`);
      }
      loader.once(Phaser.Loader.Events.COMPLETE, () => {
        // check if texture loaded, if so use instead of the default
        if (this.scene.textures.exists(`nft${nft.join()}`)) {
          this.shipSprite.setTexture(`nft${nft.join()}`);
          this.realScaleX = this.nft[0].trim() === 'Space Doodle' ? 0.4 : 0.15;
          this.scaleY = this.nft[0].trim() === 'Space Doodle' ? 0.4 : 0.15;
        }
      });
      loader.start();
    }
  }

  destroy() {
    this.nameTag.destroy();
    super.destroy();
    this.trailMesh.destroy();
  }

  /**
   * Just spawned, or respawned.
   * Sets visibility, angle of travel, initial position, and hit box.
  */
  onSpawn(state) {
    this.emit('spawn');
    this.setVisible(true);
    this.shipSprite.setAlpha(1);
    this.nameTag.setAlpha(1);
    this.setAngle((state.angle / Math.PI) * 180);
    this.setPosition(state.x, state.y);
  }

  onDeath() {
    // Ahhh dead.
    this.emit('death');
    this.scene.tweens.add({
      targets: [this.shipSprite, this.nameTag],
      alpha: 0,
      duration: 250,
      onComplete: () => {
        this.setVisible(false);
      },
      ease: 'Power1',
    });
  }

  handleEventFrameDiff(prevFrame, nextFrame) {
    if (prevFrame.state !== Constants.PLAYER_STATE.PLAYING
      && nextFrame.state === Constants.PLAYER_STATE.PLAYING) {
      this.onSpawn(nextFrame.state);
    }
    if (prevFrame.state !== Constants.PLAYER_STATE.DEAD
      && nextFrame.state === Constants.PLAYER_STATE.DEAD) {
      this.onDeath();
    }
  }

  pushFrame(frame) {
    const timestamp = this.scene.time.now;
    this.frameHistory.push({ timestamp, frame });
    if (this.frameHistory.length > FRAME_HISTORY_MAX) {
      this.frameHistory.shift();
    }
    this.nameTag.setText(frame.name);

    // Events are not sent from the server to the client, instead the client
    // will try to infer events from state changes.
    if (this.frameHistory.length >= 2) {
      this.handleEventFrameDiff(this.frameHistory[this.frameHistory.length - 2].frame,
        this.frameHistory[this.frameHistory.length - 1].frame);
    }
  }

  preUpdate(time) {
    const previousTimestampFrame = this.getPreviousTimestampFrame(time - TIME_TRAVEL_MS);
    const nextTimestampFrame = this.getNextTimestampFrame(time - TIME_TRAVEL_MS);

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    const repeat = (t, m) => clamp(t - Math.floor(t / m) * m, 0, m);

    function aLerp(a, b, t) {
      const dt = repeat(b - a, 360);
      return lerp(a, a + (dt > 180 ? dt - 360 : dt), t);
    }

    const d2r = (deg) => (deg * Math.PI) / 180.0;
    const r2d = (rad) => (rad * 180.0) / Math.PI;

    // There are two frames to interp from!
    if (previousTimestampFrame && nextTimestampFrame) {
      let interpFactor = (time - TIME_TRAVEL_MS - previousTimestampFrame.timestamp)
      / (nextTimestampFrame.timestamp - previousTimestampFrame.timestamp);
      // Just spawned in, don't interpolate anything.
      if (previousTimestampFrame.frame.state !== Constants.PLAYER_STATE.PLAYING
        && nextTimestampFrame.frame.state === Constants.PLAYER_STATE.PLAYING) {
        interpFactor = 1;
      }
      const interpPosition = new Phaser.Math.Vector2(
        previousTimestampFrame.frame.x,
        previousTimestampFrame.frame.y,
      ).lerp(new Phaser.Math.Vector2(
        nextTimestampFrame.frame.x,
        nextTimestampFrame.frame.y,
      ), interpFactor);
      let interpAngle = d2r(aLerp(r2d(previousTimestampFrame.frame.angle), r2d(nextTimestampFrame.frame.angle), interpFactor));
      if (interpAngle > Math.PI / 2 || interpAngle < -Math.PI / 2) {
        this.shipSprite.scaleX = -1 * this.realScaleX;
        interpAngle += Math.PI;
      } else {
        this.shipSprite.scaleX = 1 * this.realScaleX;
      }
      this.setPosition(interpPosition.x, interpPosition.y);
      this.setAngle((interpAngle / Math.PI) * 180);

      this.nameTag.setPosition(interpPosition.x - this.nameTag.width / 2, interpPosition.y - this.nameTag.height * 3);
      if (!this.visible) this.nameTag.visible = false;
      else this.nameTag.visible = true;

      // nametag color change based on score
      const scoreTier = {
        silver: [1500, '#C0C0C0'],
        gold: [3000, '#ffd700'],
        platinum: [4500, '#7FFFD4'],
        diamond: [6000, '#b9f2ff'],
      };

      if (this.score >= scoreTier.silver[0]) {
        this.nameTag.setColor(scoreTier.silver[1]);
      }
      if (this.score >= scoreTier.gold[0]) {
        this.nameTag.setColor(scoreTier.gold[1]);
      }
      if (this.score >= scoreTier.platinum[0]) {
        this.nameTag.setColor(scoreTier.platinum[1]);
      }
      if (this.score >= scoreTier.diamond[0]) {
        this.nameTag.setColor(scoreTier.diamond[1]);
      }
    }

    if (nextTimestampFrame) {
      // Trail bit sprites are currently used to track trail vertices.
      this.setTrailLength(nextTimestampFrame.frame.trail.length);
      for (let i = 0; i < nextTimestampFrame.frame.trail.length; i++) {
        const position = nextTimestampFrame.frame.trail[i];
        this.trailPoints[i].set(position.x, position.y);
      }
      // Resets trail animation, used to make the trail look smoother.
      if (nextTimestampFrame.frame.trail.length > 0) {
        if (this.lastTrail.x != nextTimestampFrame.frame.trail[0].x || this.lastTrail.y != nextTimestampFrame.frame.trail[0].y) {
          this.lastTrailReset = new Date().getTime();
        }
        this.lastTrail = nextTimestampFrame.frame.trail[0];
      }
      if (this.isLocalPlayer) {
        eventCenter.emit('playerFuel', nextTimestampFrame.frame.gas / Constants.GAS_MAX_DEFAULT);
        eventCenter.emit('playerScore', nextTimestampFrame.frame.score);
      }
      this.score = nextTimestampFrame.frame.score;
    }

    if (this.isLocalPlayer) {
      this.scene.cameras.main.centerOn(this.x, this.y);
    }

    this.trailMesh.clear();
    if (this.trailPoints.length > 0) {
      this.drawTrailPoly(-20, 0xfce484);
      this.drawTrailPoly(0, 0x84dccc);
      this.drawTrailPoly(20, 0xf9aaca);
    }

    if (nextTimestampFrame && nextTimestampFrame.frame.boosting) {
      this.shipSprite.setY(Math.sin(time / 70) * 10 - 10);
    } else {
      this.shipSprite.setY(Math.sin(time / 100) * 10 - 10);
    }
  }

  getPreviousTimestampFrame(time) {
    for (let i = this.frameHistory.length - 1; i >= 0; i -= 1) {
      const timestampFrame = this.frameHistory[i];
      if (timestampFrame.timestamp < time) {
        return timestampFrame;
      }
    }
    return null;
  }

  getNextTimestampFrame(time) {
    let nextTimestampFrame = null;
    for (let i = this.frameHistory.length - 1; i >= 0; i -= 1) {
      const timestampFrame = this.frameHistory[i];
      if (timestampFrame.timestamp < time) {
        break;
      }
      nextTimestampFrame = timestampFrame;
    }
    if (nextTimestampFrame == null) {
      nextTimestampFrame = this.predictFuture();
    }
    return nextTimestampFrame;
  }

  setTrailLength(length) {
    // TODO: Move trails to a separate object.
    while (length < this.trailPoints.length) {
      this.trailPoints.shift();
    }
    while (length > this.trailPoints.length) {
      this.trailPoints.push(new Phaser.Math.Vector2(0, 0));
    }
  }

  drawTrailPoly(offset, color) {
    if (this.trailPoints.length == 0) return;

    const interpFactor = Math.min((new Date().getTime() - this.lastTrailReset) / 200, 1);
    let interpTargetX = 0;
    let interpTargetY = 0;
    if (this.trailPoints.length > 1) {
      interpTargetX = this.trailPoints[1].x;
      interpTargetY = this.trailPoints[1].y;
    } else {
      interpTargetX = this.x;
      interpTargetY = this.y;
    }
    const beginPos = new Phaser.Math.Vector2(this.trailPoints[0].x, this.trailPoints[0].y).lerp(new Phaser.Math.Vector2(interpTargetX, interpTargetY), interpFactor);

    this.trailMesh.moveTo(beginPos.x, beginPos.y);

    this.trailMesh.beginPath();
    this.trailMesh.lineStyle(20, color);

    const points = [];
    for (let i = 0; i < this.trailPoints.length; i++) {
      let sourceX = this.trailPoints[i].x;
      let sourceY = this.trailPoints[i].y;
      let targetX = 0;
      let targetY = 0;
      if (this.trailPoints[i + 1]) {
        targetX = this.trailPoints[i + 1].x;
        targetY = this.trailPoints[i + 1].y;
      } else {
        targetX = this.x;
        targetY = this.y;
      }
      const angle = Phaser.Math.Angle.Between(sourceX, sourceY, targetX, targetY);
      const right = new Phaser.Math.Vector2(1, 0, 0).setAngle(angle + Math.PI / 2);
      if (i < 2) {
        const lerpPos = new Phaser.Math.Vector2(sourceX, sourceY).lerp(new Phaser.Math.Vector2(targetX, targetY), interpFactor);
        sourceX = lerpPos.x;
        sourceY = lerpPos.y;
      }
      points.push(new Phaser.Math.Vector2(sourceX + right.x * offset, sourceY + right.y * offset));
      // Last point, also connect to the player.
      if (i == this.trailPoints.length - 1) {
        points.push(new Phaser.Math.Vector2(targetX + right.x * offset, targetY + right.y * offset));
      }
    }
    const spline = new Phaser.Curves.Spline(points);
    spline.draw(this.trailMesh, 64);
  }

  /**
   * If the next frame isn't available, then we need to try to predict the
   * future. Based on a player's angle and velocity then assume the player continues
   * to move.
   */
  predictFuture() {
    return null;
  }
}

Phaser.GameObjects.GameObjectFactory.register('player',
  function PlayerGameObjectFactory(x, y, isLocalPlayer = false, nft = 'default') {
    const player = new Player(this.scene, isLocalPlayer, nft);
    player.setPosition(x, y);
    this.displayList.add(player);
    this.updateList.add(player);
    return player;
  });
