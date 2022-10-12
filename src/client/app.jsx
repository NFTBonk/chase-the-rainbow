import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CharacterSelect from './components/characterSelect/index';
import Game from './components/game/index';
import Home from './components/home/index';
import DeathScreen from './components/deathScreen/index';
import wallet from './components/home/ConnectFunction';
import data from '../../data.json';

function App() {
  const [walletAddress, setWallet] = useState('');
  const [status, setStatus] = useState('');
  const [nfts, setNfts] = useState([]);
  const mockNfts = false;

  //janky way of favicon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'shortcut icon';
  link.href = 'https://space-noodles.s3.us-west-1.amazonaws.com/favicon.ico';

  document.getElementsByTagName('head')[0].appendChild(link);

  useEffect(() => {
    const fetchNfts = async () => {
      let nfts;
      if (mockNfts) {
        nfts = await (await wallet.grabNfts(walletAddress)).concat(data);
      } else {
        nfts = await wallet.grabNfts(walletAddress);
      }
      sessionStorage.setItem('nfts', JSON.stringify(nfts));
      setNfts(nfts);
    };
    fetchNfts();
  }, [walletAddress]);

  useEffect(async () => {
    const { address, status } = await wallet.getCurrentWalletConnected();
    sessionStorage.setItem('user', address);
    setWallet(address);
    setStatus(status);
    addWalletListener();
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          sessionStorage.setItem('user', accounts[0]);
          setWallet(accounts[0]);
          setStatus('👆🏽 Write a message in the text-field above.');
        } else {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('nfts');
          setWallet('');
          setStatus('🦊 Connect to Metamask using the top right button.');
        }
      });
    } else {
      setStatus(
        <p>
          {' '}
          🦊
          {' '}
          <a target="_blank" href="https://metamask.io/download.html" rel="noreferrer">
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>,
      );
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home walletAddress={walletAddress} setWallet={setWallet} setStatus={setStatus} />} />
        <Route path="/pilots" element={<CharacterSelect />} />
        <Route path="/game" element={<Game />} />
        <Route path="/deathScreen" element={<DeathScreen />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
