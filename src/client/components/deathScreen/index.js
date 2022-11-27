import React from 'react';
import styled from 'styled-components';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import Death from '../../images/crash.png';

const Wrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 600px;
  transform: translateX(-50%);
  left: 50%;
  top: calc(50% - 275px);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: rgba(126,85,233,0.85);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  -webkit-animation: fadein 1s linear;
        animation: fadein 1s linear;
  @keyframes fadein {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
  img {
    height: 325px;
    margin: 10px 0 10px 0;
  }
`;

const DeathTitle = styled.h1`
  font-family: "Modern Warfare";
  font-weight: 400;
  font-size: 36px;
  text-align: center;
  color: #000000;
  margin: 22.5px 0 0 0;
`;

// Can't use modern warfare because it doesn't have numbers
const Stats = styled.h2`
  font-family: "Comic Sans MS", "Comic Sans", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  text-align: center;
  color: #000000;
  margin: 5px 0 5px 0;
`;

const PrimaryButton = styled.button`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: #ffadde;
  border: 1px solid black;
  box-shadow: 5px 5px 0 black;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.15s;
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  :hover {
    box-shadow: 0 0 0 black;
  }
`;

const SecondaryButton = styled.button`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: transparent;
  color: white;
  border: 1.5px solid white;
  box-shadow: 5px 5px 0 white;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.15s;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    box-shadow: 0 0 0 white;
  }
`;

const BackToHome = styled.div`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: transparent;
  margin-top: 30px;
`;

const ShareText = styled.span`
  margin-left: 10px;
`;

export default function DeathScreen() {
  return (
    <Wrapper>
      <DeathTitle id="title">Game Over!</DeathTitle>
      <Stats id="score">Score: </Stats>
      <img src={Death} alt="dead" />
      <PrimaryButton id="again">Play Again</PrimaryButton>
      <SecondaryButton id="titleMenu">
        Back To home
      </SecondaryButton>
    </Wrapper>
  );
}
