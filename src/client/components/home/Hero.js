import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../images/chasetherainbow.png';
import Rainbow from '../../images/rainbowtrail.png';
import DoodleShip from '../../images/noodlegif.gif';
import { breakpoints, mq, defaultContainerMargins } from '../../utils/styles';
import Button from './Button';
import wallet from './ConnectFunction';

const HeroContainer = styled.div`
  ${defaultContainerMargins}
  margin-top: 60px;
  margin-bottom: 50px;
  @media all and (max-width: 600px) {
    margin-bottom: 40px;
  }
`;

const HeroImage = styled.img`
  max-width: 800px;
  width: 100%;
  z-index: 500;
`;

const HeroText = styled.p`
  width: 100%;
  max-width: 800px;
  margin-top: 60px;
  color: white;
  font-size: 20px;
`;

const StyledDoodleShip = styled.img`
  position: absolute;
  width: 520px;
  right: -40px;
  top: -30px;
  transform: rotate(-20deg);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);

  @media all and (max-width: 1400px) {
    display: none;
  }
`;

const StyledRainbow = styled.img`
  position: absolute;
  width: 470px;
  height: auto;
  right: -60px;
  top: 0;


  @media all and (max-width: 1400px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  display: none;

  ${mq.gts} {
    display: inherit;
  }
`;

const StyledButton2 = styled(StyledButton)`
  display: block !important;
`


const DesktopNotification = styled.h2`
  color: white;
  display: block;
  text-align: center;

  ${mq.gts} {
    display: none;
  }
`;

function Hero({ walletAddress, setWallet }) {
  const navigate = useNavigate();

  const play = useCallback(
    () => navigate('pilots', { replace: true }),
    [navigate],
  );

  const connectWallet = async () => {
    const walletResponse = await wallet.connectWallet();
    setWallet(walletResponse.address);
  };

  return (
    <HeroContainer>
      <StyledRainbow src={Rainbow} />
      <StyledDoodleShip src={DoodleShip} />
      <HeroImage src={Logo} />
      <HeroText>
        Greetings fellow Space traveler! Space Noodles and Space Doodles have united to venture into space to Chase the Rainbow. Use your Space Noodle or Space Doodle and compete with other community members to see who can survive and collect the most rainbow points!
      </HeroText>
      {walletAddress ? (
        <StyledButton
          priority="primary"
          onClick={play}
        >
          Play
        </StyledButton>
      ) : (
        <StyledButton
          priority="secondary"
          onClick={connectWallet}
        >
          Connect Wallet to Play
        </StyledButton>
      )}
      <a href= 'https://snapshot.org/#/doodles.eth/proposal/0x4a0e91c382662ca9d0a2e49694d12df0a585231ef48cb0237d6299f2c8225d08' target='_blank' style={{textDecoration: 'none'}}>
        <StyledButton priority="secondary" style={{ marginTop: '20px'}}>
          Vote to Fund our Proposal Here
        </StyledButton>
      </a>
      <DesktopNotification>
        <a href= 'https://snapshot.org/#/doodles.eth/proposal/0x4a0e91c382662ca9d0a2e49694d12df0a585231ef48cb0237d6299f2c8225d08' target='_blank' style={{textDecoration: 'none'}}>
          <StyledButton2 priority="secondary" style={{ marginTop: '20px'}}>
            Vote to Fund our Proposal Here
          </StyledButton2>
        </a>
        CURRENTLY ONLY AVAILABLE ON DESKTOP
      </DesktopNotification>
    </HeroContainer>
  );
}

export default Hero;