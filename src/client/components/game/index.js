import Phaser from 'phaser';
import React from 'react';
import Preload from './scenes/preload';
import Ui from './scenes/ui';
import MainMap from './scenes/mainMap';

export default class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      scene: [Preload, MainMap, Ui],
      scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
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
    return <div id="phaser-game" style={{overflow: "hidden", position: "relative"}}/>;
  }
}
