import Phaser from 'phaser';
import React from 'react';
import Preload from './scenes/preload';
import Ui from './scenes/ui';
import MainMap from './scenes/mainMap';

export default class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaserGame',
      width: window.innerWidth,
      height: window.innerHeight,
      scene: [Preload, MainMap, Ui],
      scale: {
        mode: Phaser.Scale.RESIZE,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      audio: {
        disableWebAudio: false,
      },
    };
    new Phaser.Game(config);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
