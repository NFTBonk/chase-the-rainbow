import React from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Merch from './Merch.js'
import Header from './Header';
import Hero from './Hero';
import Leaderboard from './Leaderboard';
import Latest from './Latest';
import FAQ from './FAQ';
import BG from '../../images/background.png';
import { GlobalStyle } from '../../utils/styles';

const GlobalContainer = styled.div`
  background: url(${BG});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  min-height: 100vh;
`;

function Home({ walletAddress, setWallet, setStatus }) {
  if (sessionStorage.getItem('nft')) sessionStorage.removeItem('nft');
  if (sessionStorage.getItem('username')) sessionStorage.removeItem('username');
  if (sessionStorage.getItem('server')) sessionStorage.removeItem('server');

  return (
    <>
      <GlobalStyle />
      <GlobalContainer>
        <Header
          walletAddress={walletAddress}
          setWallet={setWallet}
          setStatus={setStatus}
        />
        <Hero walletAddress={walletAddress} setWallet={setWallet} />
        <Leaderboard />
        <FAQ />
        <Merch />
        {/* <Latest /> */}
        <Footer />
      </GlobalContainer>
    </>
  );
}

export default Home;
