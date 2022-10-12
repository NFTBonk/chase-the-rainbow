import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  cursor: pointer;
  height: 400px;
  width: 320px;
  height: 352px;
  border-radius: 10px;
  outline: ${(props) => (props.isSelected ? '2px solid black' : 'none')};
  box-shadow: ${(props) => (props.isSelected ? '0px 3px 0px #000000' : 'none')};
  margin-right: ${(props) => (props.isEven ? 'auto' : '0')};
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const CardImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 10px 10px;
  position: relative;
`;

const HoverContainer = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10px;
  top: 10px;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Description = styled.div`
  font-family: "Comic Sans MS", "Comic Sans", sans-serif;
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledLockIcon = styled(LockIcon)`
  position: absolute;
  top: 0.8em;
  right: 0.8em;
  color: white;
`;

const StyledArrowUpwardIcon = styled(ArrowUpwardIcon)`
  stroke: black;
  stroke-width: 1;
  transform: rotate(40deg);
  margin-left: 4px;
  margin-top: -2px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: none;
  border: 2px solid #000;
  box-sizing: border-box;
  box-shadow: 5px 5px 0 #000;
  border-radius: 10px;
  cursor: pointer;
`;

function Hover({ wrapped }) {
  return (
    <HoverContainer>
      <Button>Select</Button>
    </HoverContainer>
  );
}

Hover.propTypes = {
  wrapped: PropTypes.bool,
};

export default function CharacterCard({
  nft,
  setSelectedNft,
  isSelected,
  index,
}) {
  return (
    <CardContainer
      onClick={() => setSelectedNft(nft)}
      isSelected={isSelected}
      isEven={index % 2 === 0}
    >
      <CardImage src={nft.image} />
      <Hover />
      <Description>{nft.title}</Description>
    </CardContainer>
  );
}

CharacterCard.propTypes = {
  nft: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    wrapped: PropTypes.bool,
  }).isRequired,
  setSelectedNft: PropTypes.func,
  isSelected: PropTypes.bool,
  index: PropTypes.number,
};
