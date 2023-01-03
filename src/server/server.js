/* eslint-disable max-len */
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { MongoClient, Double } = require('mongodb');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const cors = require('cors');
const Constants = require('../shared/constants');
const { applyCollisions, applyTrailCollisions } = require('./collisions');

const FuelTank = require('./entities/fuelTank');
const Player = require('./entities/player');
const AiPlayer = require('./entities/aiPlayer');
const RainbowBit = require('./entities/rainbowBit');

const EntitySet = require('./sets/entitySet');
const PlayerSet = require('./sets/playerSet');
const SpeedUp = require('./entities/speedUp');
const Invulnerable = require('./entities/invulnerable');

require('dotenv').config();
require('isomorphic-fetch');

// Set up server
const app = express();
const httpServer = createServer(app);

// CHANGE THIS LATER TO ONLY TRUSTED DOMAINS!!!!
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());

app.get('/playerCount', (request, response, next) => {
  response.send({ count: players.size });
});

app.use(express.static(path.join(__dirname, '../../public')));
app.use('/', express.static(path.join(__dirname, '../../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pilots', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.get('/deathScreen', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

// the following key connection key is a dummy key for open source purposes
const uri = 'mongodb+srv://noodlesNFT:chasetherainbow@cluster0.0edf1rl.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

// store this recaptcha secret key in a process env later
const recaptchaSecret = process.env.RECAPTCHA_SECRET;
// temporarily disable captcha
const verifyCaptcha = false;

// post a players score
app.post('/leaderBoard', async (request, response, next) => {
  try {
    console.log(request.body);
    const result = await collection.insertOne(request.body);
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

// query all score from a player
app.get('/leaderBoard/:walletAddress', async (request, response, next) => {
  const result = await collection.findOne({ wallet: request.params.walletAddress });
  try {
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

// retrieve all scores to display on the leaderboard. Filtering will be added when needed
app.get('/leaderBoard', async (request, response, next) => {
  try {
    const globalRanking = await collection.find().sort({ score: -1 }).limit(10).toArray();
    const weeklyRanking = await collection.find({ timestamp2: { $gte: Date.now() - 7 * 60 * 60 * 24 * 1000 } }).sort({ score: -1 }).limit(10).toArray();
    response.send({ global: globalRanking, weekly: weeklyRanking });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

// TODO: Combine both players and entities list.
// TODO: Restructure entities to have hierarchy, and single World .
const players = new PlayerSet();
const entities = new EntitySet();

httpServer.listen(process.env.PORT || 3000, async () => {
  try {
    await client.connect();
    collection = client.db('test').collection('test');
    console.log(`listening on ${httpServer.address().port}`);
  } catch (e) {
    console.error(e);
  }
});

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`);

  const player = new Player(socket.id, socket);
  players.add(player);

  socket.on('angle', (angle) => {
    player.inputAngle = angle;
  });

  socket.on('login', (auth) => {
    console.log('login', auth);
    if (verifyCaptcha) {
      if (!auth.token) return; // add some way to notify player they didn't send a recaptcha token
      const url = 'https://www.google.com/recaptcha/api/siteverify';

      fetch(`${url}?secret=${recaptchaSecret}&response=${auth.token}`, {
        method: 'POST',
      }).then((res) => {
        res.json().then((json) => {
          if (json.success) {
            console.log('score', json.score);
            if (json.score < 0.3) {
            // add some way to notify player their captcha score too low
              return;
            }
            player.send('loggedIn');
            player.setName(auth.name);
            player.spawn(auth.nft);
            player.setTourneyCode(auth.tourneyCode);
            player.setWallet(auth.walletaddy);
          } else {
            console.log('recaptcha failed', json['error-codes']);
          // add some way to notify player the recaptcha failed
          }
        });
      });
    } else {
      player.send('loggedIn1');
      player.setName(auth.name);
      player.spawn(auth.nft);
    }
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id}`);
    players.delete(player);
  });

  socket.on('forceDisconnect', () => {
    console.log(`user disconnected: ${socket.id}`);
    players.delete(player);
  });

  socket.on('spacebar', (isPressed) => {
    if (player.state === Constants.PLAYER_STATE.PLAYING || !isPressed) {
      player.boost(isPressed);
    }
  });
});

const TICK_INTERVAL = 200;

// Main game loop / tick.
let frameId = 0;
let lastTime = new Date().getTime();
setInterval(() => {
  // Log delta interval.
  const currentTime = new Date().getTime();
  // console.log(currentTime - lastTime);
  lastTime = currentTime;
  // Run entity updates.
  players.forEach((player) => {
    player.update(new Date().getTime(), TICK_INTERVAL);
  });
  // Generating ai bots depending on number of players
  if (players.size < Constants.MAX_BOTS) {
    const id = uuidv4();
    const aiPlayer = new AiPlayer(id);
    aiPlayer.spawn();
    // console.log(`AI Player Joined -> ${aiPlayer.id}`);
    players.add(aiPlayer);
  }

  // Generating entities if there are less than the max amount
  if (entities.size < Constants.MAX_ITEMS) {
    for (let i = entities.size; i < Constants.MAX_ITEMS; i++) {
     
      //10% chance to generate a powerup 90% chance to generate non-powerup entities
      if(Math.random() < 0.1) {
        let powerupTypeRandomizer = Math.random();
        if(powerupTypeRandomizer < 0.25) {
          const speedUp = new SpeedUp();
          entities.add(speedUp);
        } else if (powerupTypeRandomizer >= 0.25 && powerupTypeRandomizer < 0.5) {
          const double = new Double();
          entities.add(double);
        } else if (powerupTypeRandomizer >= 0.5 && powerupTypeRandomizer < 0.75) {
          const invul = new Invulnerable();
          entities.add(invul);
        } else {
          const magnet = new Magnet();
          entities.add(magnet);
        }
        
      } else {
        // 50/50 chance to generate either a rainbow bit or a fuel tank
        if (Math.random() < 0.5) {
          const rainbowBit = new RainbowBit();
          entities.add(rainbowBit);
        } else {
          const fuelTank = new FuelTank();
          entities.add(fuelTank);
        }
      }
    }
  }

  // Run collision engine.
  // TODO: Replace collision engine with MatterJS or SAT-based system.
  players.forEach((player) => {
    const playersInRadius = players.getAllEntitiesWithinRadius(player.x, player.y, 2000);
    if (playersInRadius.has(player)) {
      playersInRadius.delete(player);
    }
    const entitiesInRadius = entities.getAllEntitiesWithinRadius(player.x, player.y, 2000);

    const [_, drops1] = applyCollisions(player, playersInRadius, players);
    applyCollisions(player, entitiesInRadius, entities);
    const drops = applyTrailCollisions(player, playersInRadius, entities);

    if (Array.isArray(drops) && drops.length > 0) {
      drops.forEach((drop) => {
        entities.add(drop);
      });
    } else if (Array.isArray(drops1) && drops1.length > 0) {
      drops1.forEach((drop) => {
        entities.add(drop);
      });
    }
  });

  // This is used for sending players updates of what is on their screen.
  // This current version will be an expensive update of everything, but
  // eventually a running cache of frames can be stored to calculate a diff.
  players.forEach((player) => {
    let playersInRadius = players.getAllEntitiesWithinRadius(player.x, player.y, 6000);
    if (playersInRadius.has(player)) {
      playersInRadius.delete(player);
    }

    const entitiesInRadius = entities.getAllEntitiesWithinRadius(player.x, player.y, 2000);

    // Filter out all players not yet logged in.
    playersInRadius = new Set(Array.from(playersInRadius).filter(
      (playerInRadius) => playerInRadius.state !== Constants.PLAYER_STATE.LOGGING_IN,
    ));

    const playersInRadiusNetworkModel = Array.from(playersInRadius)
      .map((playerInRadius) => playerInRadius.getNetworkModel());
    const entitiesInRadiusNetworkModel = Array.from(entitiesInRadius)
      .map((entityInRadius) => entityInRadius.getNetworkModel());

    const framePacket = {
      id: frameId,
      localPlayer: player.getLocalPlayerNetworkModel(),
      players: playersInRadiusNetworkModel,
      entities: entitiesInRadiusNetworkModel,
    };

    if (player.ai) {
      player.tick(entitiesInRadiusNetworkModel);
    } else {
      player.send('frame', framePacket);
    }
  });

  // Send the leaderboard to all players
  const lb = [...players].sort((a, b) => b.score - a.score).map((a) => ({ score: a.score, id: a.id, name: a.name }));
  io.sockets.emit('lb', lb);

  frameId += 1;
}, TICK_INTERVAL);
