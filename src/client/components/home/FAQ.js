import React from 'react';
import styled from 'styled-components';
import PromoVid from '../../images/promo.mp4';

import { defaultContainerMargins, mq } from '../../utils/styles';

const StyledIFrame = styled.video`
  width: 100%;
  height: 300px;
  ${mq.gtl} {
    height: calc(100% - 80px);
  }
  @media (max-width: 625px) {
    height: 200px;
  }
`;

const FAQContainer = styled.div`
  ${defaultContainerMargins}
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media (max-width: 625px) {
    margin-top: 40px;
  }

  ${mq.gtl} {
    grid-template-columns: 1fr 1fr;
  }
`;

const FAQSection = styled.section`
  background:
    linear-gradient(
      145deg,
      rgb(255 255 255 / 40%) 0%,
      rgb(255 255 255 / 10%) 100%
    );
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 30px;
`;

const H2 = styled.h2`
  margin-top: 0;
`;

export default function FAQ() {
  return (
    <FAQContainer>
      <FAQSection>
        <H2>TEASER</H2>
        <StyledIFrame controls>
          <source src = { PromoVid } type="video/mp4"/>
        </StyledIFrame>
      </FAQSection>

      <FAQSection>
        <H2>FAQ</H2>
        <h3>What is a Space Noodle or Space Doodle?</h3>
        <p>
          Space Noodles and Space Doodles are an NFT collection that is backed 1:1 by your Noodle or Doodle and utilizes a special NFT wrapping smart contract. Only one can exist in your wallet at any time and you can wrap/unwrap as many times as you like. They are full animated created with hundreds of visual and audio traits, on chain stats, and dozens of ships!
        </p>
        <h3>How can I play?</h3>
        <p>
          You must own a Noodle or Doodle to play this game. The Noodle or Doodle must be "wrapped" into the corresponding Space Noodle or Doodle, and this can be done on the respective websites. Connect the wallet that contains the Space Noodle or Doodle and hit play!
        </p>
        <h3>Open Source?</h3>
        <p>
          As a community driven initiative, this game will be fully open source which gives community members real influence in the direction to the game. What kind of innovations would you like to see? What gameplay ideas do you have?
        </p>
      </FAQSection>
    </FAQContainer>

  );
}