import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Noodle from '../../images/noodle.png';
import Doodle from '../../images/doodles.png';
import wallet from './ConnectFunction';
import Button from './Button';

import mp3 from '../../images/PassTheRainbow.mp3';
import Start from '../../images/volume-up.png';
import Stop from '../../images/no-sound.png';

const HeaderContainer = styled.header`
  display: flex;
  background: rgba(255, 255, 255, 0.3);
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  z-index: 9;
  height: 72px;
  * {
    z-index: 9;
  }
  a {
    text-decoration: none !important;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  margin-left: auto;
`;

const ConnectedWalletBtn = styled.div`
  display: flex;
  align-items: center;
  font-family: "Comic Sans MS", "Comic Sans", sans-serif;
  font-size: 18px;
  justify-content: space-between;
  width: 240px;
  height: 40px;
  background: rgb(197 197 255 / 50%);
  border-radius: 10px;
  padding: 4px 4px 4px 20px;

  div {
    background: rgb(255 255 255 / 50%);
    border-radius: 10px;
    padding: 4px 4px 4px 10px;
  }
`;

const WrapButton = styled.button`
  border-radius: 15px;
  width: 120px;
  height: 40px;
  line-height: 30px;
  background: transparent;
  display: flex;
  justify-content: center;
  border: 3px solid black;
  cursor: pointer;
  text-align: center;
  img {
    height: 35px;
  }
`;

const PlayButton = styled.img`
  width: 40px;
  height: 40px;
`;

// Audio player component
function AudioPlayer() {
  const [audio] = useState(new Audio(mp3));
  const [play, setPlay] = useState(false);

  useEffect(() => {
    audio.loop = 'loop';
    audio.autoplay = 'true'; // will not autoplay unless the user interacts with the DOM
    play ? audio.play() : audio.pause();
  }, [play, audio]);

  const togglePlay = () => {
    setPlay(!play);
    audio.currentTime = 0; // resets the audio so that it plays at the beginning
  };

  return (
    <PlayButton src={play ? Start : Stop} alt="" onClick={() => togglePlay()} />
  );
}

function Header({ walletAddress, setWallet, setStatus }) {
  const connectWalletPressed = async () => {
    const walletResponse = await wallet.connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const walletConnected = walletAddress.length > 0;

  return (
    <HeaderContainer>
      <HeaderLeft>
      <AudioPlayer />
        <a href="http://www.noodles.app" target="_blank" rel="noreferrer">
          <WrapButton>
            Wrap
            {' '}
            <img style={{ height: '30px', marginLeft: '10px' }} src={Noodle} alt="noodle" />
          </WrapButton>
        </a>
        <a href="http://www.doodles.app" target="_blank" rel="noreferrer">
          <WrapButton>
            Wrap
            {' '}
            <img style={{ height: '30px', marginLeft: '10px' }} src={Doodle} alt="doodle" />
          </WrapButton>
        </a>

        {/* <AudioPlayer /> */}
        <a href="https://space-noodles-doc.notion.site/Noodles-x-Doodles-Community-Presents-Chase-the-Rainbow-53906b47f7e14ce1b3964458fbc5a7f8" target="_blank" rel="noreferrer"><Button priority="text"> Documentation</Button></a>
        <a href="http://shop.noodles.app" target="_blank" rel="noreferrer"><Button priority="text"> Shop Merch</Button></a>

        {walletConnected && (
        <ConnectedWalletBtn>
          {'Connected: '}
          <div>
            {`${String(walletAddress).substring(0, 6)}...${String(
              walletAddress,
            ).substring(38)}`}
          </div>
        </ConnectedWalletBtn>
        )}

        {!walletConnected && (
        <Button
          priority="text"
          onClick={connectWalletPressed}
        >
          Connect Wallet
        </Button>
        )}
      </HeaderLeft>
    </HeaderContainer>
  );
}

export default Header;
