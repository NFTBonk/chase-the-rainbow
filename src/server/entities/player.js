const Angle = require('phaser/src/math/angle');
const { faker } = require('@faker-js/faker');
const axios = require('axios');
const Filter = require('bad-words');
const SocketEntity = require('./socketEntity');
const Constants = require('../../shared/constants');
const Trail = require('./trail');

const filter = new Filter();

module.exports = class Player extends SocketEntity {
  constructor(id, socket) {
    super(socket);

    this.id = id;
    this.type = Constants.ENTITY_TYPE.PLAYER;
    this.state = Constants.PLAYER_STATE.LOGGING_IN;

    // Player geometric attributes.
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.angle = 0;
    this.radius = Constants.PLAYER_RADIUS;

    // Player game attributes.
    this.name = 'Player';
    this.score = 0;
    this.gas = Constants.GAS_INIT;
    this.gasMax = Constants.GAS_MAX_DEFAULT;
    this.boosting = false;
    this.speed = 0.5;
    this.tourneyCode = '';
    this.walletaddy = '';
    this.speedUpTime = 0;
    this.doubleTime = 0;
    this.magnetTime = 0;
    this.invulTime = 0;

    // Player inputs to process, updated as the player sends new packets.
    this.inputAngle = 0;
    this.inputBoosting = false;

    this.trail = new Trail(this);
  }

  update(time, dt) {
    if (this.state === Constants.PLAYER_STATE.PLAYING) {
      this.trail.update(time, dt);

      // Used to do collision detection.
      this.lastX = this.x;
      this.lastY = this.y;

      const newX = this.x + Math.cos(this.angle) * dt * this.speed;
      const newY = this.y + Math.sin(this.angle) * dt * this.speed;
      if (newX >= 0 && newX <= Constants.MAP_SIZE) {
        this.x = newX;
      }
      if (newY >= 0 && newY <= Constants.MAP_SIZE) {
        this.y = newY;
      }
      this.angle = Angle.RotateTo(this.angle, this.inputAngle, 0.95);

      // handle boosting
      if (this.boosting && this.gas >= dt * 0.1) {
        if(this.speedUpTime > 0) {
          this.speed = 1.5;
        } else {
          this.speed = 0.75;
        }
        this.gas -= dt * 0.1;
      } else {
        this.boosting = false;
        if(this.speedUpTime > 0) {
          this.speed = 1;
        } else {
          this.speed = 0.5;
        }
      }

      if(this.speedUpTime > 0) {
        this.speedUpTime -= dt;

        if(this.speedUpTime < 0) {
          this.speedUpTime = 0;
        }
      } 

      if(this.doubleTime > 0) {
        this.doubleTime -= dt;

        if(this.doubleTime < 0) {
          this.doubleTime = 0;
        }
      } 

      if(this.invulTime > 0) {
        this.invulTime -= dt;

        if(this.invulTime < 0) {
          this.invulTime = 0;
        }
      } 

      if(this.magnetTime > 0) {
        this.magnetTime -= dt;

        if(this.magnetTime < 0) {
          this.magnetTime = 0;
        }
      } 



      // reset trail length after 1500 points, when player increases tier
      if (this.score % 1500 === 0) {
        this.trail.setLength(1);
      }
    }
  }

  boost(isBoosting) {
    this.boosting = isBoosting;
  }

  addGas() {
    if (this.gas + Constants.GAS_ADD_INCREMENT <= this.gasMax) {
      this.gas += Constants.GAS_ADD_INCREMENT;
    } else {
      this.gas = this.gasMax;
    }
  }

  addScore() {
    this.score += Constants.SCORE_ADD_INCREMENT;
    this.trail.setLength(Math.floor(this.score % 1500 * Constants.SCORE_TO_TRAIL_LENGTH_RATIO) + 1);
  }

  activateSpeedUp() {
    this.speedUpTime = 30000;
  }

  activateDouble() {
    this.doubleTime = 30000;
  }

  activateInvul() {
    this.invulTime = 30000;
  }

  activateMagnet() {
    this.magnetTime = 30000;
  }

  setName(name) {
    this.name = name;
  }

  setTourneyCode(tourneyCode) {
    this.tourneyCode = tourneyCode;
  }

  setWallet(walletAddress) {
    this.walletaddy = walletAddress;
  }

  spawn(nft = 'default') {
    this.state = Constants.PLAYER_STATE.PLAYING;
    this.x = Math.floor(Math.random() * (Constants.MAP_SIZE - 400) + 200);
    this.y = Math.floor(Math.random() * (Constants.MAP_SIZE - 400) + 200);
    this.lastX = this.x;
    this.lastY = this.y;
    this.angle = 0;
    this.score = 0;
    this.gas = Constants.GAS_MAX_DEFAULT;
    this.trail.setLength(1);
    this.nft = nft;

    if (this.ai) {
      const aiName = faker.name.findName().split(' ');
      // this is because some names have Mr. or Ms. in them
      if (aiName.length > 2) this.name = aiName[1];
      else this.name = aiName[0];
    }
    if (this.name) this.name = filter.clean(this.name);
    this.trail.resetPosition(this.x, this.y);
  }

  die() {
    function lerp(v0, v1, t) {
      return v0 * (1 - t) + v1 * t;
    }
    if (!this.ai) {
      const today = new Date();

      axios.post('http://localhost:3000/leaderBoard', {
        doodId: `${this.nft[0]}#${this.nft[1]}`,
        name: this.name,
        score: this.score,
        tourneyCode: this.tourneyCode,
        walletaddy: this.walletaddy,
        timestamp: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
        timestamp2: Date.now(),
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.state = Constants.PLAYER_STATE.DEAD;
    const bitsToDrop = Math.min(this.score / 10, 200);
    const bitsBetweenTrail = Math.min(Math.max(1, Math.floor(bitsToDrop / this.trail.trailQueue.length)), 100);
    const dropPositions = [];
    this.trail.trailQueue.forEach((pos, index) => {
      if (index === this.trail.trailQueue.length - 1) return;
      for (let i = 0; i < bitsBetweenTrail; i++) {
        dropPositions.push({
          x: lerp(pos.x, this.trail.trailQueue[index + 1].x, i / bitsBetweenTrail),
          y: lerp(pos.y, this.trail.trailQueue[index + 1].y, i / bitsBetweenTrail),
        });
      }
    });
    this.trail.setLength(0);
    return dropPositions;
  }

  /**
   * This should be a simplified model of the player, used to network over.
   * @returns The simplified network model.
   */
  getNetworkModel() {
    return {
      id: this.id,
      name: this.name,
      state: this.state,
      x: this.x,
      y: this.y,
      angle: this.angle,
      boosting: this.boosting,
      trail: this.trail.getNetworkModel(),
      nft: this.nft,
    };
  }

  /**
   * This is an extension of the simplified network model, with private
   * information that doesn't exist for other players.
   * @returns The simplified network model with information relevant to player.
   */
  getLocalPlayerNetworkModel() {
    return Object.assign(this.getNetworkModel(), {
      score: this.score,
      gas: this.gas,
    });
  }

  shouldCollide() {
    return this.state == Constants.PLAYER_STATE.PLAYING;
  }

  /** If this player's score is higher, the other player is deleted.
   *  If the other player's score is higher, this player is deleted.
   *  If the scores are equal, both players are deleted.
   */
  onCollision(player, globalEntities) {
    if (this.score >= player.score && player.state === Constants.PLAYER_STATE.PLAYING) {
      return player.die();
    }
    if (this.score <= player.score && this.state === Constants.PLAYER_STATE.PLAYING) {
      return this.die();
    }
  }
};
