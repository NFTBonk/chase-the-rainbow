import Phaser from 'phaser';
import React from 'react';
import Preload from './scenes/preload';
import Ui from './scenes/ui';
import MainMap from './scenes/mainMap';
import Rotate from './scenes/rotate';
import Prepreload from './scenes/prepreload';

export default class Game extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const config = {
      type: Phaser.AUTO,
      scene: [Prepreload, Preload, MainMap, Ui, Rotate],
      scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
      },
      input: {
        activePointers: 3,
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
