import React from 'react';
import styled from 'styled-components';
import Content from './Content';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  justify-content: center;
  font-size: 16px;
  min-height: 7em;
  top: 100%;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  background:
    linear-gradient(
      145deg,
      rgb(255 255 255 / 40%) 0%,
      rgb(255 255 255 / 10%) 100%
    );
  backdrop-filter: blur(20px);
  margin-top: 100px;
  @media (max-width: 625px) {
    margin-top: 0px;
    font-size: 12px;
    min-height: 5em;
  }
`;
const SocialContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (max-width: 1022.5px) {
    grid-template-columns: 1fr;
    text-align: center;
    line-height: normal;
  }
`;
const Social = styled.div`
  a {
    img {
      height: 2em;
      margin: 16px;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <h2>join our communities!</h2>
      <SocialContainer>
        <Social>
          {Content.doodlesocial.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noreferrer">
              <img src={social.img} alt="icons" />
            </a>
          ))}
        </Social>
        <Social>
          {Content.noodlesocial.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noreferrer">
              <img src={social.img} alt="icons" />
            </a>
          ))}
        </Social>
      </SocialContainer>
    </FooterContainer>
  );
}

export default Footer;
