import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CharacterCard from './CharacterCard';
import Constants from '../../../shared/constants';

const Container = styled.div`
  background:
    linear-gradient(
      145deg,
      rgb(255 255 255 / 40%) 0%,
      rgb(255 255 255 / 10%) 100%
    );
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  padding: 50px;
  border-radius: 20px;
  width: 54%;
  height: calc(100vh - 152px);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const NFTContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  p {
    font-family: "Comic Sans MS", "Comic Sans", sans-serif;
    a {
      color: black;
    }
  }
`;

const UsernameTitle = styled.h1`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 20px;
`;

const SectionTitle = styled.h1`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 20px;
`;

export default function CharacterList({
  nfts, setSelectedNft, selectedNft, username, usernameChange, setValidUsername, serverChange, tourneyCodeChange, 
}) {
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    // Set errorMessage only if text is equal or bigger than MAX_LENGTH
    if (username.length >= Constants.MAX_USERNAME_LENGTH) {
      setValidUsername(false);
      setErrorMessage(
        'The input has exceeded the maximum number of characters',
      );
    }

    // Set errorMessage only if text length is 0
    if (username.length === 0) {
      setValidUsername(false);
      setErrorMessage(
        'Please enter your username',
      );
    }
  }, [username]);

  React.useEffect(() => {
    // Set empty erroMessage only if text is less than MAX_LENGTH
    // and errorMessage is not empty.
    // avoids setting empty errorMessage if the errorMessage is already empty
    if (username.length < Constants.MAX_USERNAME_LENGTH && errorMessage && username.length !== 0) {
      setValidUsername(true);
      setErrorMessage('');
    }
  }, [username, errorMessage]);

  const [usaCount, setUsa] = useState('CONNECTING..');
  const [usa2Count, setUsa2] = useState('CONNECTING..');
  const [euCount, setEu] = useState('CONNECTING..');

  useEffect(() => {
    const getResponse = async (url) => {
      try {
        const res = await fetch(`${url}/playerCount?t=${Date.now()}`);
        const data = await res.json();
        return data.count ? { success: true, count: data.count } : { success: false };
      } catch (error) {
        return { success: false, error };
      }
    };
    const fetchData = async () => {
      const cnt = await getResponse('https://www.chasetherainbow.app');
      if (cnt.success) {
        setUsa(cnt.count >= Constants.MAX_PLAYERS ? `${cnt.count} players (FULL)` : `${cnt.count} players`);
      } else {
        setUsa('OFFLINE');
      }

      const cnt2 = await getResponse('https://space-doodles-us2.herokuapp.com');
      if (cnt2.success) {
        setUsa2(cnt2.count >= Constants.MAX_PLAYERS ? `${cnt2.count} players (FULL)` : `${cnt2.count} players`);
      } else {
        setUsa2('OFFLINE');
      }
      const cnt3 = await getResponse('https://space-doodles-eu1.herokuapp.com');
      if (cnt3.success) {
        setEu(cnt3.count >= Constants.MAX_PLAYERS ? `${cnt3.count} players (FULL)` : `${cnt3.count} players`);
      } else {
        setEu('OFFLINE');
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <UsernameTitle>enter username</UsernameTitle>
      <TextField
        sx={{
          width: 376,
          height: 38,
          marginBottom: 8,
        }}
        id="outlined-error"
        helperText={errorMessage}
        defaultValue={username}
        variant="outlined"
        onChange={(e) => usernameChange(e.target.value)}
      />
      <SectionTitle>Select a Server</SectionTitle>
      <FormControl
        sx={{
          marginBottom: 5,
        }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => serverChange(e.target.value, { us1: usaCount, us2: usa2Count, eu1: euCount })}
        >
          <FormControlLabel value="us1" control={<Radio />} label={`USA (${usaCount})`} />
          <FormControlLabel value="us2" control={<Radio />} label={`USA 2 (${usa2Count})`} />
          <FormControlLabel value="eu1" control={<Radio />} label={`Europe (${euCount})`} />
        </RadioGroup>
      </FormControl>
      {/* <UsernameTitle>🦈 Tournament Code 🦈</UsernameTitle>
      <TextField
        sx={{
          width: 376,
          height: 38,
          marginBottom: 8,
        }}
        id="outlined-error"
        variant="outlined"
        onChange={(e) => tourneyCodeChange(e.target.value)}
      /> */}
      <SectionTitle>Select a Pilot</SectionTitle>
      <NFTContainer>
        {nfts.length == 0 ? <p>No Playable NFTs available, wrap your Noodle or Doodle to play!</p> :nfts.map((nft, index) => (
          <CharacterCard
            key={nft.title}
            nft={nft}
            index={index}
            setSelectedNft={setSelectedNft}
            isSelected={selectedNft.title === nft.title}
          />
        ))}
      </NFTContainer>
    </Container>
  );
}

CharacterList.defaultProps = {
  nfts: [],
};

CharacterList.propTypes = {
  nfts: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      wrapped: PropTypes.bool,
    }),
  ),
  setSelectedNft: PropTypes.func.isRequired,
  selectedNft: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    wrapped: PropTypes.bool,
  }),
};