import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { mq, defaultContainerMargins } from '../../utils/styles';
import Planet from '../../images/planet.png';
import Noodle1 from '../../images/ctrnoodle.png';
import Moon from '../../images/chopstickhand.gif';

const PlanetImg = styled.img`
  position: absolute;
  width: 18%;
  height: auto;
  top: -5%;
  left: -10%;
  transform: rotate(-10deg);
  mix-blend-mode: overlay;
  @media (max-width: 605px) {
    top: 0%;
    left: -5%;
  }
`;

const NoodleImg = styled.img`
  position: absolute;
  width: 30%;
  height: auto;
  top: -30%;
  right: -12%;
  transform: rotate(10deg);
  @media (max-width: 1625px) {
    top: -10%;
  }
`;

const LeaderboardContainer = styled.div`
  ${defaultContainerMargins}
  display: flex wrap;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background:
    linear-gradient(
      145deg,
      rgb(255 255 255 / 40%) 0%,
      rgb(255 255 255 / 10%) 100%
    );
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 30px;
  margin-bottom: 50px;
  @media (max-width: 625px) {
    margin-bottom: 40px;
  }

  ${mq.gts} {
    flex-direction: row;
  }
`;

const LeaderboardPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text {
    font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  }
  @media (max-width: 1160) {
    text {
      display: none;
    }
  }

  ${mq.lts} {
    & + & {
      margin-top: 30px;
    }
  }

  ${mq.gts} {
    width: 50%;
  }
`;

const LeaderboardRow = styled.div`
  display: grid;
  grid-template-columns: 37% 36% 27%;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
  }

  & + & {
    margin-top: 16px;
  }
`;

const LeaderboardSection = styled.div`
  flex: 1 0 auto;
  display: flex;
  width: 100%;
  margin-bottom: 50px
`;

const LeaderboardImage = styled.img`
  height: 3em;
  border-radius: 10px;
`;

const LeaderboardText = styled.div`
  font-weight: bold;
  font-size: 13px;
`;

const H1 = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
`;

const MissionStatement = styled.div`
  ${defaultContainerMargins}
  display: flex;
  justify-content: space-between;
  @media (max-width: 1505px) {
    align-items: center;
    align-content: center;
    text-align: center;
    flex-direction: column;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const MissionStatementSummary = styled.div`
  display: block;
  width: 100%;
  div {
    display: block;
    margin-bottom: 15px;
  }

  ${mq.gts} {
    width: 60%;
  }
`;

const MoonGif = styled.img`
  /* display: none; */
  width: 400px;


  @media (max-width:1360) {
    width: 200px;
  }

  @media (max-width:625) {
    width: 100px;
  }
`;

function Leaderboard() {
  const [rankings, setRankings] = useState({});

  useEffect(async () => {
    try {
      let response = await axios.get('http://localhost:3000/leaderBoard');
      setRankings(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <LeaderboardContainer>
        <PlanetImg src={Planet} alt="planet" />
        <NoodleImg src={Noodle1} alt="planet" />

        <LeaderboardSection>
        <LeaderboardPanel>
          <H1>Global </H1> <h4>Leaderboard</h4>
          {rankings?.global?.map((social,index) => (
            <LeaderboardRow key={index}>
              <LeaderboardText>
                {`${social.name}`}
              </LeaderboardText>
                <a href = {social.doodId.split(' ')[social.doodId.split(' ').length-2] === 'Doodle' ? `https://opensea.io/assets/ethereum/0x620b70123fb810f6c653da7644b5dd0b6312e4d8/${social.doodId.split('#')[social.doodId.split('#').length-1]}` : `https://opensea.io/assets/ethereum/0x8153f4b100def4b1480b18dd159e64e68f1ad4c7/${social.doodId.split('#')[social.doodId.split('#').length-1]}`} target="_blank">
                  <LeaderboardText>
                    {`${social.doodId.split(' ')[social.doodId.split(' ').length-2] + ' ' + social.doodId.split(' ')[social.doodId.split(' ').length-1]}`}
                  </LeaderboardText>
                </a>
              <LeaderboardText>
                {`${social.score}`}
              </LeaderboardText>
            </LeaderboardRow>
          ))}
        </LeaderboardPanel>

        <LeaderboardPanel>
          <H1>Weekly </H1> <h4>Leaderboard</h4>
          {rankings?.weekly?.map((social,index) => (
            <LeaderboardRow key={index}>
              <LeaderboardText>
                {`${social.name}`}
              </LeaderboardText>
                <a href = {social.doodId.split(' ')[social.doodId.split(' ').length-2] === 'Doodle' ? `https://opensea.io/assets/ethereum/0x620b70123fb810f6c653da7644b5dd0b6312e4d8/${social.doodId.split('#')[social.doodId.split('#').length-1]}` : `https://opensea.io/assets/ethereum/0x8153f4b100def4b1480b18dd159e64e68f1ad4c7/${social.doodId.split('#')[social.doodId.split('#').length-1]}`} target="_blank">
                  <LeaderboardText>
                    {`${social.doodId.split(' ')[social.doodId.split(' ').length-2] + ' ' + social.doodId.split(' ')[social.doodId.split(' ').length-1]}`}
                  </LeaderboardText>
                </a>
              <LeaderboardText>
                {`${social.score}`}
              </LeaderboardText>
            </LeaderboardRow>
          ))}
        </LeaderboardPanel>
        </LeaderboardSection>

        <LeaderboardSection>
        <LeaderboardPanel>
          <H1>Global Kill</H1> <h4>Leaderboard</h4>
          {rankings?.globalKills?.map((social,index) => (
            <LeaderboardRow key={index}>
              <LeaderboardText>
                {`${social.name}`}
              </LeaderboardText>
                <a href = {social.doodId.split(' ')[social.doodId.split(' ').length-2] === 'Doodle' ? `https://opensea.io/assets/ethereum/0x620b70123fb810f6c653da7644b5dd0b6312e4d8/${social.doodId.split('#')[social.doodId.split('#').length-1]}` : `https://opensea.io/assets/ethereum/0x8153f4b100def4b1480b18dd159e64e68f1ad4c7/${social.doodId.split('#')[social.doodId.split('#').length-1]}`} target="_blank">
                  <LeaderboardText>
                    {`${social.doodId.split(' ')[social.doodId.split(' ').length-2] + ' ' + social.doodId.split(' ')[social.doodId.split(' ').length-1]}`}
                  </LeaderboardText>
                </a>
              <LeaderboardText>
                {`${social.kills}`}
              </LeaderboardText>
            </LeaderboardRow>
          ))}
        </LeaderboardPanel>
        <LeaderboardPanel>
          <H1>Weekly Kill</H1> <h4>Leaderboard</h4>
          {rankings?.weeklyKill?.map((social,index) => (
            <LeaderboardRow key={index}>
              <LeaderboardText>
                {`${social.name}`}
              </LeaderboardText>
                <a href = {social.doodId.split(' ')[social.doodId.split(' ').length-2] === 'Doodle' ? `https://opensea.io/assets/ethereum/0x620b70123fb810f6c653da7644b5dd0b6312e4d8/${social.doodId.split('#')[social.doodId.split('#').length-1]}` : `https://opensea.io/assets/ethereum/0x8153f4b100def4b1480b18dd159e64e68f1ad4c7/${social.doodId.split('#')[social.doodId.split('#').length-1]}`} target="_blank">
                  <LeaderboardText>
                    {`${social.doodId.split(' ')[social.doodId.split(' ').length-2] + ' ' + social.doodId.split(' ')[social.doodId.split(' ').length-1]}`}
                  </LeaderboardText>
                </a>
              <LeaderboardText>
                {`${social.kills}`}
              </LeaderboardText>
            </LeaderboardRow>
          ))}
        </LeaderboardPanel>
        </LeaderboardSection>
      </LeaderboardContainer>
      <MissionStatement>
        <MissionStatementSummary>
          <H1>What is Chase the Rainbow?</H1>
          <div>
          Chase the Rainbow is a community driven multiplayer and interoperable browser-based game. Play with your wrapped Space Noodles or Space Doodles and battle to collect the most rainbow points!
          </div>


          <div>
          Chase the Rainbow aims to spark a new perspective on how community-led initiatives could be developed by fostering an autonomous creative direction. This is the starting point for Chase the Rainbow, the Beta, we hope to invite developers, artists, musicians, designers, and any creative community member to contribute amazing ideas to our game. The game is ENTIRELY open-source, which allows for the community to contribute their own ideas directly into the code, so that we can build the best game and vision together. Open sourcing our game drives community-led initiatives, which is an integral objective that Noodles aims to nurture and incubate for creativity and innovation.
          </div>

          <div>
          Head over to our <b><a href='https://space-noodles-doc.notion.site/Noodles-x-Doodles-Community-Presents-Chase-the-Rainbow-53906b47f7e14ce1b3964458fbc5a7f8' target="_blank" rel="noreferrer">Notion Documentation</a></b> for more in depth information and how to play!
          </div>
        </MissionStatementSummary>
        <MoonGif src={Moon} alt="moon" />
      </MissionStatement>
    </>
  );
}

export default Leaderboard;
