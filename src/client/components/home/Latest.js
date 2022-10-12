import React from 'react';
import styled from 'styled-components';

const LatestContainer = styled.div`
  background:
    linear-gradient(
      145deg,
      rgb(255 255 255 / 40%) 0%,
      rgb(255 255 255 / 10%) 100%
    );
  backdrop-filter: blur(20px);
  border-radius: 30px;
  margin: 4% 15%;
  padding: 2%;
  width: 35%;

  @media (max-width: 1625px) {
    text-align: center;
    margin: 4% 5% !important;
    width: 90%;
  }
`;
function Latest() {
  return (
    <LatestContainer>
      <h1>Latest</h1>
    </LatestContainer>
  );
}

export default Latest;
