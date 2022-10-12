import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../home/Button';
import { Link } from 'react-router-dom';
import Filter from 'bad-words';

const filter = new Filter();

const SelectImage = styled.img`
  margin-top: 60px;
  margin-bottom: 100px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
`;

// this will be used later on for background-less nfts
const TempImageContainer = styled.img`
  margin-bottom: 20px;
  width: 650px;
  height: 650px;
`;

const SelectTitle = styled.h1`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 40px;
  margin-top: 60px;
  text-align: center;
`;

const Number = styled.span`
  font-family: "Comic Sans MS", "Comic Sans", sans-serif;
  font-size: 36px;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 46%;
`;

export default function CharacterDisplay({ nft, username, validUsername, validServer, server, tourneyCode }) {
  const start = () => {
    const [collectionName, tokenId] = nft.title.split('#');
    window.sessionStorage.setItem('nft', JSON.stringify([collectionName, tokenId]));
    window.sessionStorage.setItem('username', username);
    window.sessionStorage.setItem('server', server);
    window.sessionStorage.setItem('tourneyCode', tourneyCode);
  };

  return (
    <RightWrapper>
      {nft && (
        <>
          <SelectTitle>
            {nft.title.split(' ')[nft.title.split(' ').length - 2]}
            <br />
            <Number>{nft.title.split(' ')[nft.title.split(' ').length - 1]}</Number>
          </SelectTitle>
          {/* <TempImageContainer src={require(`./${nft.title.split('#')[1]}.png`)} /> */}
          <SelectImage src={nft.image} />
          <Link to="/game"><Button size="large" onClick={start} disabled={!validUsername || !validServer}>Start</Button></Link>
        </>
      )}
    </RightWrapper>
  );
}

CharacterDisplay.propTypes = {
  nft: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    wrapped: PropTypes.bool,
  }).isRequired,
};
