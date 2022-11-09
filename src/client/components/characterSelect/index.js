import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Filter from 'bad-words';
import CharacterList from './CharacterList';
import CharacterDisplay from './CharacterDisplay';
import Header from '../home/Header';
import Constants from '../../../shared/constants';

const filter = new Filter();

const ArrowBack = styled(ArrowBackIcon)`
  cursor: pointer;
  position: absolute;
  top: 8%;
  left: 3%;
  transform: scale(1.5);
  color: white;
`;

const ScreenWrapper = styled.div`
  height: 100vh;
  background: radial-gradient(110.55% 37.67% at 0% 3.97%, #4E38D7 0%, rgba(88, 73, 182, 0) 100%),
    radial-gradient(29.2% 17.5% at 100% 67.52%, #FFADDE 0%, rgba(255, 173, 222, 0) 100%),
    linear-gradient(180deg, #8C7DEA 0%, #CB7CFF 61.46%, #FFADDE 100%);
  background-size: cover;
  background-repeat: repeat;
  box-sizing: border-box;
`;

const MainWrapper = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  display:flex;
  margin-top: 40px;
`;

function CharacterSelect() {
  if (!sessionStorage.getItem('user')) window.location.replace('https://www.chasetherainbow.app');
  if (sessionStorage.getItem('nft')) sessionStorage.removeItem('nft');
  if (sessionStorage.getItem('username')) sessionStorage.removeItem('username');
  if (sessionStorage.getItem('server')) sessionStorage.removeItem('server');

  const [selectedNft, setSelectedNft] = useState(
    JSON.parse(sessionStorage.getItem('nfts'))[0] || false,
  );

  const [server, setServer] = useState('us1');
  const [username, setUsername] = useState('');
  const [tourneyCode, setTourneyCode] = useState('');

  const [validUsername, setValidUsername] = useState(true);
  const [validServer, setValidServer] = useState(false);

  const usernameChange = (e) => {
    setUsername(e);
  };

  const tourneyCodeChange = (e) => {
    setTourneyCode(e);
  };

  const serverChange = (e, serverCount) => {
    // Grab the number of players in the selected server and check if it's valid (less than MAX_PLAYERS)
    const playersInServer = Number(serverCount[e].split(' ')[0]);
    if (playersInServer >= Constants.MAX_PLAYERS) {
      setValidServer(false);
    } else {
      setServer(e);
      setValidServer(true);
    }
  };

  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <ArrowBack onClick={() => navigate('/')} />
      <Header walletAddress={sessionStorage.getItem('user')} />
      <MainWrapper>
        <CharacterList
          nfts={JSON.parse(sessionStorage.getItem('nfts'))}
          setSelectedNft={setSelectedNft}
          selectedNft={selectedNft}
          username={username}
          usernameChange={usernameChange}
          setValidUsername={setValidUsername}
          serverChange={serverChange}
          tourneyCodeChange={tourneyCodeChange}
        />
        <CharacterDisplay
          nft={selectedNft}
          username={username}
          server={server}
          validUsername={validUsername}
          validServer={validServer}
          tourneyCode={tourneyCode}
        />
      </MainWrapper>
    </ScreenWrapper>
  );
}

export default CharacterSelect;
